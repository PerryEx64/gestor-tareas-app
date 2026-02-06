import { LayoutScreen } from '../../../components/layouts/LayoutScreen';
import { LoginForm } from '../../../components/forms/LoginForm';
import { useCallback, useContext, useState } from 'react';
import { FormLoginProps } from '../../../types/auth.types';
import { onLogin } from '../../../services/AuthService';
import { AuthContext } from '../../../store/AuthContext';
import { saveStorageSecure } from '../../../services/StorageService';
import Toast from 'react-native-toast-message';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Card } from '@ui-kitten/components';
import { ConfigurationAuthSheet } from './components/ConfigurationAuthSheet';
import { handlerError } from '../../../utils/error-handler';

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
        const message = handlerError(e);
        Toast.show({
          type: 'error',
          text1: 'Error de inicio de sesión',
          text2: message,
        });
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
        style={{ flex: 1 }}
      >
        <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
          <LoginForm onSubmit={onSubmitLogin} isLoading={isLoading} />
          <Card style={styles.card} disabled>
            <ConfigurationAuthSheet />
          </Card>
        </ScrollView>
      </KeyboardAvoidingView>
    </LayoutScreen>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 24,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
});
