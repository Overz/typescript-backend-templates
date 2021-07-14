import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { CustomThemeProvider } from '~/contexts';
import { App } from '~/app';
import { ErrorBoundary } from './errors';
import * as Updates from 'expo-updates';

/**
 * Main da aplicação que engloba tudo.
 *
 * Utilizado no arquivo `index.js`
 * ao registrar este componente como "Main"
 *
 * Também verifica se existem atualizações
 * para baixar e recarregar.
 *
 * @returns JSX.Element
 */
export default function () {
  useEffect(() => {
    const update = async () => {
      const { isAvailable } = await Updates.checkForUpdateAsync();

      if (isAvailable) {
        await Updates.fetchUpdateAsync();
        await Updates.reloadAsync();
      }
    };

    try {
      update();
    } catch (err) {
      console.log('[Updates] Error checking updates or updating.');
      console.log(err);
    }
  });

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
