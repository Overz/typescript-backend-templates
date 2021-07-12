import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Button } from 'react-native';
import { Container, Text } from './styles';

/**
 * Tela de erro padrão
 */
export const FallBack: React.FC = () => {
  const navigation = useNavigation();
  return (
    <Container>
      <Text>Ops, ocorreu um erro!</Text>
      <Button title="Voltar" onPress={() => navigation.goBack()} />
    </Container>
  );
};
