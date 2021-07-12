import { View as DefaultView, Text as DefaultText } from 'react-native';
import styled from 'styled-components';

export const Container = styled(DefaultView)`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Text = styled(DefaultText)`
  font-weight: bold;
  font-size: 20;
  color: ${({ theme }) => theme.colors.text};
`;
