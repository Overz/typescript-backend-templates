export interface AuthContextData {
  user: User;
  setUser: (user: User) => void;
  signIn: () => Promise<void>;
  // sigUp: () => Promise<void>;
  // sigOut: () => Promise<void>;
}

export interface User {
  nome: string;
  email: string;
}
