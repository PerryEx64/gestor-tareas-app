import { StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { LayoutScreen } from '../../../components/layouts/LayoutScreen';
import { RegisterForm } from '../../../components/forms/RegisterForm';
import { RegisterBody } from '../../../types/auth.types';

export const RegisterScreen = () => {
  const handleRegister = (data: RegisterBody) => {
    console.log('Register data:', data);
  };

  return (
    <LayoutScreen level="1">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <RegisterForm onSubmit={handleRegister} />
      </KeyboardAvoidingView>
    </LayoutScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
