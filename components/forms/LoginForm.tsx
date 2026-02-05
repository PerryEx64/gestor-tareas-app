import { Controller, useForm } from 'react-hook-form';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Text } from '@ui-kitten/components';
import { FormLoginProps } from '../../types/auth.types';
import { useState } from 'react';
import { Input } from '../Input';
import { Button } from '../Button';
import { emailValidation, passwordValidation } from '../../utils/rules-form';
import { usePublicNavigation } from '../../hooks/usePublicNavigation';

interface LoginFormProps {
  onSubmit: (data: FormLoginProps) => void;
}

export const LoginForm = (props: LoginFormProps) => {
  const { onSubmit } = props;
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormLoginProps>();
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const navigation = usePublicNavigation();
  const handleRegisterNavigation = () => {
    navigation.navigate('register');
  };

  const renderCaption = (message?: string) => {
    if (!message) {
      return null;
    }
    return (
      <Text style={styles.captionText} status="danger">
        {message}
      </Text>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text category="h1" style={styles.title}>
          Bienvenido
        </Text>
        <Text category="s1" appearance="hint" style={styles.subtitle}>
          Inicia sesión para gestionar tus tareas
        </Text>
      </View>

      <View style={styles.form}>
        <Controller
          name="email"
          control={control}
          rules={emailValidation}
          render={({ field: { value, onBlur, onChange } }) => {
            return (
              <Input
                value={value}
                label="Correo electrónico"
                placeholder="ejemplo@correo.com"
                onBlur={onBlur}
                onChangeText={onChange}
                status={errors.email ? 'danger' : 'basic'}
                caption={renderCaption(errors.email?.message)}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                textContentType="emailAddress"
              />
            );
          }}
        />

        <Controller
          name="password"
          control={control}
          rules={passwordValidation}
          render={({ field: { onBlur, onChange, value } }) => {
            return (
              <Input
                value={value}
                label="Contraseña"
                placeholder="Ingresa tu contraseña"
                onBlur={onBlur}
                onChangeText={onChange}
                status={errors.password ? 'danger' : 'basic'}
                caption={renderCaption(errors.password?.message)}
                secureTextEntry={secureTextEntry}
                autoCapitalize="none"
                autoComplete="password"
                textContentType="password"
              />
            );
          }}
        />

        <TouchableWithoutFeedback
          onPress={() => console.log('Forgot password')}
        >
          <Text style={styles.forgotPassword} status="info" category="c1">
            ¿Olvidaste tu contraseña?
          </Text>
        </TouchableWithoutFeedback>
      </View>

      <Button onPress={handleSubmit(onSubmit)}>Iniciar Sesión</Button>

      <View style={styles.footer}>
        <Text appearance="hint" category="c1">
          ¿No tienes una cuenta?{' '}
        </Text>
        <TouchableWithoutFeedback onPress={handleRegisterNavigation}>
          <Text status="primary" category="c1" style={styles.registerLink}>
            Regístrate aquí
          </Text>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  header: {
    marginBottom: 48,
    alignItems: 'center',
  },
  title: {
    marginBottom: 8,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 16,
  },
  form: {
    gap: 20,
    marginBottom: 24,
  },
  captionText: {
    marginTop: 4,
    fontSize: 12,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginTop: -8,
  },
  button: {
    marginBottom: 24,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  registerLink: {
    fontWeight: 'bold',
  },
});
