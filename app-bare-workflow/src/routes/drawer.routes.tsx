import React from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import {
  StyleProp,
  ViewStyle,
  Image,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import { Routes } from '~/constants';
import { Screen1, Screen2 } from '~/screens';
import Animated from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

type Animation = Animated.Node<number>;
let progress: Animation;
const setProgress = (p: Animation) => (progress = p);
const getProgress = () => progress;

/**
 * Cria um animated style durante a movimentação
 * da sidebar
 *
 * @returns style
 */
const getAnimatedStyle = (): StyleProp<ViewStyle> => {
  const scale = Animated.interpolateNode(getProgress(), {
    inputRange: [0, 1],
    outputRange: [1, 0.8],
  }) as unknown as number;

  const borderRadius = Animated.interpolateNode(getProgress(), {
    inputRange: [0, 1],
    outputRange: [0, 16],
  }) as unknown as number;

  return {
    borderRadius,
    transform: [{ scale }],
    flex: 1,
    shadowColor: '#FFF',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 5,
    overflow: 'hidden',
  };
};

const Screens: React.FC = () => (
  <Animated.View style={getAnimatedStyle()}>
    <Stack.Navigator
      headerMode="none"
      screenOptions={{
        animationEnabled: true,
        gestureEnabled: true,
        ...TransitionPresets.RevealFromBottomAndroid,
      }}
    >
      <Stack.Screen name={Routes.TELA_1} component={Screen1} />
      <Stack.Screen name={Routes.TELA_2} component={Screen2} />
    </Stack.Navigator>
  </Animated.View>
);

/**
 * Cria um conteúdo de sidebar atualizando o constante progresso
 * durante a movimentação de abertura/fechamento da sidebar
 *
 * @param props Propriedades do DrawerNavigation
 * @returns JSX.Element
 */
export const DrawerContent: React.FC<DrawerContentComponentProps> = (props) => {
  setProgress(props.progress);

  return (
    <DrawerContentScrollView {...props}>
      <View style={{ margin: 20 }}>
        <Image
          source={{
            uri: 'https://image.flaticon.com/icons/png/512/25/25231.png',
            width: 80,
            height: 80,
            scale: 0.5,
          }}
          resizeMode="cover"
          style={{
            marginBottom: 16,
            borderWidth: StyleSheet.hairlineWidth,
          }}
        />
        <Text style={{ color: '#fff' }}>Christian Lima</Text>
        <Text style={{ color: '#fff', fontSize: 9 }}>
          christian.ff@hotmail.com
        </Text>
      </View>
      <DrawerItem
        label="Tela 1"
        labelStyle={{ color: '#fff' }}
        onPress={() => props.navigation.navigate(Routes.TELA_1)}
      />
      <DrawerItem
        label="Tela 2"
        labelStyle={{ color: '#fff' }}
        onPress={() => props.navigation.navigate(Routes.TELA_2)}
      />
    </DrawerContentScrollView>
  );
};

export const DrawerNavigation: React.FC = () => (
  <LinearGradient style={{ flex: 1 }} colors={['#f35166', '#6823f3']}>
    <Drawer.Navigator
      initialRouteName={Routes.TELA_1}
      drawerType="slide"
      overlayColor="transparent"
      drawerStyle={{ flex: 1, width: '40%', backgroundColor: 'transparent' }}
      sceneContainerStyle={{ backgroundColor: 'transparent' }}
      drawerContentOptions={{
        activeBackgroundColor: 'transparent',
        activeTintColor: 'white',
        inactiveTintColor: 'white',
      }}
      drawerContent={DrawerContent}
    >
      <Drawer.Screen name="Screens" component={Screens} />
    </Drawer.Navigator>
  </LinearGradient>
);
