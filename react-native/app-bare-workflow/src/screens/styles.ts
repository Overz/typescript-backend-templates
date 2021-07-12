import styled from 'styled-components/native';
import { Text as DefaulText, View as DefaultView } from 'react-native';

export const Container = styled(DefaultView)`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Text = styled(DefaulText)`
  font-size: 20px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
`;
