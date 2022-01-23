import React from 'react';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import { Screen1, Screen2 } from '~/screens';
import { Routes } from '~/constants';
import { TransitionSpec } from '@react-navigation/stack/lib/typescript/src/types';

// Tutorial: https://youtu.be/PvjV96CNPqM
const { Navigator, Screen } = createStackNavigator();

/**
 * Configuração de transição de telas
 * personalizada, utilizar dentro do StackNavigation
 * como mencionado neste link:
 * https://reactnavigation.org/docs/stack-navigator/#animations
 *
 * ```ts
 * transitionSpec: {
 *  open: spec,
 *  close: spec
 * }
 * ```
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const spec: TransitionSpec = {
  animation: 'spring',
  config: {
    stiffness: 650,
    damping: 350,
    mass: 3,
    overshootClamping: false,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

export const StackNavigation: React.FC = () => (
  <Navigator
    initialRouteName={Routes.TELA_1}
    screenOptions={{
      animationEnabled: true,
      gestureEnabled: true,
      ...TransitionPresets.SlideFromRightIOS,
      // transitionSpec: {
      //   open: spec,
      //   close: spec,
      // },
    }}
    headerMode="none"
  >
    <Screen name={Routes.TELA_1} component={Screen1} />
    <Screen name={Routes.TELA_2} component={Screen2} />
  </Navigator>
);
