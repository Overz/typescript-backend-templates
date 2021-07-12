import styled, { css } from 'styled-components/native';

export const Container = styled.View<{ centered?: boolean }>`
  flex: 1;
  align-self: center;
  ${({ centered }) =>
    centered &&
    css`
      justify-content: center;
      align-items: center;
    `}
`;
