# Template

Este projeto é um template pre-configurado para react-native para SDK 30.

## Custom import `~/components`

```ts
import { Sidebar } from '~/components/sidebar';
```

## Leitura de arquivos `.env` com `react-native-dotenv`

Esta configuração requer pre-requistos do babel, olhar o arquivo [babel.config.js](./babel.config.js) com o seguinte codigo:

```js
    [
    'module:react-native-dotenv',
    {
        moduleName: '@env',
        path: '.env',
        blacklist: null,
        whitelist: null,
        safe: false,
        allowUndefined: false,
    },
    ],
```

Para utilizar, precisa de um arquivo `.env` com alguma environment dentro,
e um arquivo de definição de tipos [react-native-dotenv.d.ts](./src/@types/react-native-dotenv.d.ts) para utilizar corretamente como mostrado abaixo:

```ts
import { API_URL } from '@env';
```

## Eslint

Configuração média para o ESLint

## Theme Switcher

A troca de tema esta configurada na pasta [contexts](./src/contexts/theme/index.tsx).

O Theme Switcher implementado utiliza as libs:

- styled-components
- react-native-apparence
- use-context-selector(em geral da aplicação)

Para implementar este tema, foi necessário a criação de um `CustomThemeContext` englobando a aplicação, como visto no arquivo [index.tsx](./src/index.tsx).
Em seguida, utilizando o `ThemeProvider`(encontrado aqui: [app.tsx](./src/app.tsx#22)) do `styled-components` que ira repassar as propiedades soberescritas no arquivo [styled-components.d.ts](./src/@types/styled-components.d.ts) que ficara disponível para a utilização deste tema em toda aplicação após inicializada.

```tsx
import { View as DefaultView, Text as DefaultText } from 'react-native';
import styled from 'styled-components';

export const Container = styled(DefaultView)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Text = styled(DefaultText)`
  font-weight: bold;
  font-size: 20;
  color: ${({ theme }) => theme.colors.text};
`;
```

Verificações necessárias para a troca do StatusBar do telefone, troca de tema já estão implementadas no arquivo [app.tsx](./src/app.tsx);

O uso do AsyncStorage para salvar o tema escolhido, e trocar corretamente ao abrir a aplicação.

Uma observasão importante a ser feita:
_Ao trocar de tela, o app realiza transições entre telas, e no background desta trasação, existe um fundo branco, para remover esse "bug", um componente "Wrapper" engloba toda a aplicação removendo este fundo a cada troca de tela [Wrapper](./src/app.tsx#49)_
