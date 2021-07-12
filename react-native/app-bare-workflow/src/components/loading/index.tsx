import React from 'react';
import { ActivityIndicator } from 'react-native';
import { Container } from './styles';

export const Loading: React.FC<{ centered?: boolean }> = ({ centered }) => (
  <Container centered={centered}>
    <ActivityIndicator size="large" color="#ccc" />
  </Container>
);
