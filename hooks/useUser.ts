import { AuthContext, User } from '../store/AuthContext';
import { useContext } from 'react';

export const useUserData = (): User | null => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useUserData must be used within an AuthContextProvider');
  }
  return context.user;
};
