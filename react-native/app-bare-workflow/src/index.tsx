import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { CustomThemeProvider } from '~/contexts';
import { App } from '~/app';
import { ErrorBoundary } from './errors';

/**
 * Main da aplicação que engloba tudo.
 *
 * Utilizado no arquivo `index.js`
 * ao registrar este componente como "Main"
 *
 * @returns JSX.Element
 */
export default function Index() {
  return (
    <SafeAreaProvider>
      <ErrorBoundary>
        <CustomThemeProvider>
          <App />
        </CustomThemeProvider>
      </ErrorBoundary>
    </SafeAreaProvider>
  );
}
