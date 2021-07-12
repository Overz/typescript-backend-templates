import React, { useState, useCallback } from 'react';
import { createContext } from 'use-context-selector';
import { AuthContextData, User } from './types';

const AuthContext = createContext({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState({} as User);

  const signIn = useCallback(async () => {
    // TODO
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, signIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
