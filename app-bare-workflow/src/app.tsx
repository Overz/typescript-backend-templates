import React from 'react';
import { StatusBar } from 'react-native';
import styled, { ThemeProvider } from 'styled-components/native';
import { dark, light } from '~/contexts';
import { useCustomThemeSelector } from './hooks';
import { AppearanceProvider } from 'react-native-appearance';
import { NavigationContainer } from '@react-navigation/native';
import { FallBack } from './errors';
import { Routes } from '~/routes';
import { DefaultTheme } from 'styled-components/native';

/**
 * Aplicação
 *
 * @returns JSX.Element
 */
export const App: React.FC = () => {
  const theme = useCustomThemeSelector();
  const schema = theme === 'light' ? light : dark;

  return (
    <ThemeProvider theme={schema}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={theme === 'light' ? 'dark-content' : 'light-content'}
      />
      <Wrapper>
        <AppearanceProvider>
          <NavigationContainer fallback={FallBack}>
            <Routes />
          </NavigationContainer>
        </AppearanceProvider>
      </Wrapper>
    </ThemeProvider>
  );
};

/**
 * É necessário englobar o NavigationContainer
 * para remover um "bug" visual na troca de tela.
 *
 * Problema: Aparece um "feiche" de luz na troca de tela
 *
 * A solução para esse problema pode ser feita de outras formas
 * como mencionado neste link:
 * https://stackoverflow.com/questions/59900898/white-background-flashing-when-switching-screens-react-navigation-v5
 */
const Wrapper = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

/**
 * Utilizar caso necessário.
 *
 * Retorna as configurações de tema padrão do NavigationTheme
 *
 * @param schema Schema de cores do tema
 * @param theme nome do tema
 * @returns NavigationTheme
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const NavigationTheme = (schema: DefaultTheme, theme: string) => ({
  theme: {
    colors: {
      background: schema.colors.background,
      border: schema.colors.background,
      card: schema.colors.background,
      notification: schema.colors.background,
      text: schema.colors.text,
      primary: schema.colors.theme,
    },
    dark: theme === 'light' ? true : false,
  },
});
