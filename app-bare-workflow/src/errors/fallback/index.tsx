import React from 'react';
import { Container, Text } from './styles';
import { DevSettings, Button } from 'react-native';

/**
 * Tela de erro padrão
 */
export const FallBack: React.FC = () => (
  <Container>
    <Text>Ops, ocorreu um erro!</Text>
    <Button title="Restart" onPress={() => DevSettings.reload()} />
  </Container>
);
