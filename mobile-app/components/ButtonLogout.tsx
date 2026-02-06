import { Button } from './Button';
import { useCallback, useContext, useState } from 'react';
import { AuthContext } from '../store/AuthContext';
import { deleteStorageSecure } from '../services/StorageService';
import { Spinner } from '@ui-kitten/components';

export const ButtonLogout = () => {
  const { setUser } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = useCallback(async () => {
    setIsLoading(true);
    await deleteStorageSecure('user');
    await deleteStorageSecure('accessToken');
    await deleteStorageSecure('theme');

    setTimeout(() => {
      setUser(null);
      setIsLoading(false);
    }, 2000);
  }, []);
  return (
    <Button
      isLoading={isLoading}
      onPress={handleLogout}
      status="danger"
      activeOpacity={0.7}
    >
      Cerrar Sesión
    </Button>
  );
};
