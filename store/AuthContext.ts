import { createContext } from 'react';

export interface User {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
}

interface AuthContextProps {
  isAuthenticated: boolean;
  user: User | null;
  setUser: (user: User | null) => void;
}

const AuthContextInitValues: AuthContextProps = {
  isAuthenticated: false,
  user: null,
  setUser: () => {},
};

export const AuthContext = createContext(AuthContextInitValues);
