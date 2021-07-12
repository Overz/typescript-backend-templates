import React, { useState, useEffect, useCallback } from 'react';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { ThemeOptions } from 'styled-components';
import { CustomThemeContextData } from './types';
import { useColorScheme } from 'react-native-appearance';
import { THEME } from '~/constants';
import { createContext } from 'use-context-selector';

const CustomThemeContext = createContext({} as CustomThemeContextData);

const CustomThemeProvider: React.FC = ({ children }) => {
  const colorSchema = useColorScheme();
  const [theme, setTheme] = useState<ThemeOptions>(() =>
    colorSchema === 'no-preference' ? 'light' : colorSchema
  );
  const storage = useAsyncStorage(THEME);

  /**
   * Resgata o tema quando a apicação abre
   */
  const getTheme = useCallback(async () => {
    setTheme(((await storage.getItem()) as ThemeOptions) || 'light');
  }, []);

  useEffect(() => {
    getTheme();
  }, []);

  /**
   * Troca o tema da aplicação
   * salvando no AsyncStorage para
   * resgatar futuramente.
   */
  const changeTheme = useCallback(async () => {
    setTheme((state) => {
      const theme: ThemeOptions = state === 'light' ? 'dark' : 'light';
      storage.setItem(theme);
      return theme;
    });
  }, []);

  /**
   * Troca o tema para o default(light)
   */
  const defaultTheme = useCallback(() => setTheme('light'), []);

  return (
    <CustomThemeContext.Provider
      value={{
        theme,
        changeTheme,
        defaultTheme,
      }}
    >
      {children}
    </CustomThemeContext.Provider>
  );
};

export { CustomThemeContext, CustomThemeProvider };
