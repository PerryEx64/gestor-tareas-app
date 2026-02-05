import { AuthContext, User } from './AuthContext';
import { ReactNode, useEffect, useMemo, useState } from 'react';

interface AuthContextProviderProps {
  children: ReactNode;
}
export const AuthContextProvider = (props: AuthContextProviderProps) => {
  const { children } = props;
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    /*const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }*/
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
    []
  );
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
