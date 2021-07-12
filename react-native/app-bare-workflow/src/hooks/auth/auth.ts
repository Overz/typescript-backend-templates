import { useContextSelector } from 'use-context-selector';
import { AuthContext } from '~/contexts';

/**
 * - user
 * - setUser
 */
export const useUserSelector = () => {
  const user = useContextSelector(AuthContext, (auth) => auth.user);
  const setUser = useContextSelector(AuthContext, (auth) => auth.setUser);

  return { user, setUser };
};
