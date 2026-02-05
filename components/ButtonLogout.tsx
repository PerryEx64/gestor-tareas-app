import { Button } from './Button';

export const ButtonLogout = () => {
  const handleLogout = () => {
    // logout
  };
  return (
    <Button onPress={handleLogout} status="danger" activeOpacity={0.7}>
      Cerrar Sesión
    </Button>
  );
};
