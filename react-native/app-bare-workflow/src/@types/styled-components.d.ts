import 'styled-components';

/**
 * Existe a necessidade de utilizar a propria lib dentro deste arquivo
 * pois o Override da interface "DefaultTheme" ira sobreescrever
 * literalmente todos os métodos, caso não utilizado acima
 */
declare module 'styled-components' {
  export type ThemeOptions = 'light' | 'dark';

  export interface DefaultTheme {
    title: ThemeOptions;

    colors: {
      background: string;
      title: string;
      text: string;
      view: string;
      button: string;
      theme: string;
    };
  }
}
