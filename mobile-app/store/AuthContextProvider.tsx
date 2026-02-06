import { AuthContext } from './AuthContext';
import { ReactNode, useEffect, useMemo, useState } from 'react';
import { User } from '../types/user.types';
import { getStorageSecure } from '../services/StorageService';

interface AuthContextProviderProps {
  children: ReactNode;
}
export const AuthContextProvider = (props: AuthContextProviderProps) => {
  const { children } = props;
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getStorageSecure('user').then((userStored) => {
      if (userStored) {
        setUser(JSON.parse(userStored));
      }
    });
  }, []);

  useEffect(() => {
    if (user) {
      setIsAuthenticated(true);
    }
  }, [user]);

  const values = useMemo(
    () => ({
      isAuthenticated,
      user,
      setUser,
    }),
    [isAuthenticated, user, setUser]
  );

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
