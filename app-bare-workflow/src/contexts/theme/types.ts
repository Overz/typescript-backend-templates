import { DefaultTheme, ThemeOptions } from 'styled-components';

export interface CustomThemeContextData {
  theme: ThemeOptions;
  changeTheme: () => void;
  defaultTheme: () => void;
}

export const light: DefaultTheme = {
  title: 'light',

  colors: {
    background: '#F5F5F5',
    title: '#000',
    text: '#000',
    theme: 'red',
    button: 'blue',
    view: '#fff',
  },
};

export const dark: DefaultTheme = {
  title: 'dark',

  colors: {
    background: '#2D2E34',
    button: 'blue',
    text: '#fff',
    title: '#fff',
    view: '#2D2E34',
    theme: '#2D2E34',
  },
};
