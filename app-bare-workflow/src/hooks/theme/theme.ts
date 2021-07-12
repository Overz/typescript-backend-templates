import { CustomThemeContext } from '~/contexts';
import { useContextSelector } from 'use-context-selector';

/**
 * - theme
 */
export const useCustomThemeSelector = () =>
  useContextSelector(CustomThemeContext, (theme) => theme.theme);

/**
 * - changeTheme
 */
export const useCustomThemeChangeSelector = () =>
  useContextSelector(CustomThemeContext, (theme) => theme.changeTheme);

/**
 * - theme
 * - changeTheme
 * - defaultTheme
 */
export const useCustomTheme = () => {
  const theme = useContextSelector(CustomThemeContext, (theme) => theme.theme);
  const changeTheme = useContextSelector(
    CustomThemeContext,
    (theme) => theme.changeTheme
  );
  const defaultTheme = useContextSelector(
    CustomThemeContext,
    (theme) => theme.defaultTheme
  );

  return { theme, changeTheme, defaultTheme };
};
