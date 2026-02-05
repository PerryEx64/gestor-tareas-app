import { LayoutScreen } from '../../../components/layouts/LayoutScreen';
import { LoginForm } from '../../../components/forms/LoginForm';
import { useCallback, useContext, useState } from 'react';
import { FormLoginProps } from '../../../types/auth.types';
import { onLogin } from '../../../services/AuthService';
import { AuthContext } from '../../../store/AuthContext';
import { saveStorageSecure } from '../../../services/StorageService';
import Toast from 'react-native-toast-message';

export const LoginScreen = () => {
  const { setUser } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmitLogin = useCallback(
    async (data: FormLoginProps) => {
      setIsLoading(true);

      try {
        const { user, token } = await onLogin(data.email, data.password);

        setUser(user);
        await saveStorageSecure('accessToken', token);
        await saveStorageSecure('user', JSON.stringify(user));

        Toast.show({
          type: 'success',
          text1: 'Inicio de sesión exitoso',
          text2: `¡Bienvenido de nuevo, ${user.firstname}!`,
        });
      } catch (e: any) {
        if (e?.status === 401) {
          Toast.show({
            type: 'error',
            text1: 'Credenciales inválidas',
            text2: 'El correo electrónico o la contraseña son incorrectos.',
          });
          return;
        }

        Toast.show({
          type: 'error',
          text1: 'Error de inicio de sesión',
          text2: 'Por favor, verifica tus credenciales e intenta nuevamente.',
        });
      } finally {
        setIsLoading(false);
      }
    },
    [onLogin, setUser]
  );

  return (
    <LayoutScreen level="1">
      <LoginForm onSubmit={onSubmitLogin} isLoading={isLoading} />
    </LayoutScreen>
  );
};
