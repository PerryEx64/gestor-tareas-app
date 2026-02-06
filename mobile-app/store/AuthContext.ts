import { createContext } from 'react';
import { User } from '../types/user.types';

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
