import {
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { LayoutScreen } from '../../../components/layouts/LayoutScreen';
import { RegisterForm } from '../../../components/forms/RegisterForm';
import { RegisterBody } from '../../../types/auth.types';
import { useCallback, useContext, useState } from 'react';
import { onLogin, onRegister } from '../../../services/AuthService';
import { saveStorageSecure } from '../../../services/StorageService';
import Toast from 'react-native-toast-message';
import { AuthContext } from '../../../store/AuthContext';
import { handlerError } from '../../../utils/error-handler';

export const RegisterScreen = () => {
  const { setUser } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = useCallback(
    async (data: RegisterBody) => {
      setIsLoading(true);

      try {
        const { user, token } = await onRegister(data);

        setUser(user);
        await saveStorageSecure('accessToken', token);
        await saveStorageSecure('user', JSON.stringify(user));

        Toast.show({
          type: 'success',
          text1: 'Inicio de sesión exitoso',
          text2: `¡Bienvenido de nuevo, ${user.firstname}!`,
        });
      } catch (e: any) {
        const errorMessage = handlerError(e);
        Toast.show({
          type: 'error',
          text1: 'Error al iniciar sesión',
          text2: errorMessage,
        });
        console.log(JSON.stringify(e));
      } finally {
        setIsLoading(false);
      }
    },
    [onLogin, setUser]
  );

  return (
    <LayoutScreen level="1">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
          <RegisterForm onSubmit={handleRegister} isLoading={isLoading} />
        </ScrollView>
      </KeyboardAvoidingView>
    </LayoutScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
