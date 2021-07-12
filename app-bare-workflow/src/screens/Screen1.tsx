import React from 'react';
import { Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Container, Text } from './styles';
import { useCustomThemeChangeSelector } from '~/hooks';

export const Screen1: React.FC = () => {
  const navigation = useNavigation();
  const changeTheme = useCustomThemeChangeSelector();

  return (
    <Container>
      <Text>Tela 1</Text>
      <Button title="Tela 2" onPress={() => navigation.navigate('Screen2')} />
      <Button title="Trocar Tema" onPress={() => changeTheme()} />
    </Container>
  );
};
