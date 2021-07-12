import React from 'react';
import { Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Container, Text } from './styles';
import { useCustomThemeChangeSelector } from '~/hooks';

export const Screen2: React.FC = () => {
  const navigation = useNavigation();
  const changeTheme = useCustomThemeChangeSelector();

  return (
    <Container>
      <Text>Tela 2</Text>
      <Button title="Tela 1" onPress={() => navigation.goBack()} />
      <Button title="Trocar Tema" onPress={() => changeTheme()} />
    </Container>
  );
};
