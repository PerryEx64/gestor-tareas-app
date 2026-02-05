import { Controller, useForm } from 'react-hook-form';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Text, Card, Spinner } from '@ui-kitten/components';
import { FormLoginProps } from '../../types/auth.types';
import { useState } from 'react';
import { Input } from '../Input';
import { Button } from '../Button';
import { emailValidation, passwordValidation } from '../../utils/rules-form';
import { usePublicNavigation } from '../../hooks/usePublicNavigation';
import { LayoutScreen } from '../layouts/LayoutScreen';

interface LoginFormProps {
  onSubmit: (data: FormLoginProps) => void;
  isLoading: boolean;
}

export const LoginForm = (props: LoginFormProps) => {
  const { onSubmit, isLoading } = props;
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
    <LayoutScreen>
      <Card style={styles.card} disabled>
        <View style={styles.headerSection}>
          <Text category="h1" style={styles.title}>
            Bienvenido
          </Text>
          <Text category="p1" appearance="hint" style={styles.subtitle}>
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
                  size="large"
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
                  size="large"
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

          <Button
            onPress={handleSubmit(onSubmit)}
            disabled={isLoading}
            accessoryRight={isLoading ? <Spinner size="small" /> : undefined}
            size="large"
          >
            Iniciar Sesión
          </Button>
        </View>
      </Card>

      <View style={styles.footer}>
        <Text appearance="hint" category="p1">
          ¿No tienes una cuenta?{' '}
        </Text>
        <TouchableWithoutFeedback onPress={handleRegisterNavigation}>
          <Text status="primary" category="p1" style={styles.registerLink}>
            Regístrate aquí
          </Text>
        </TouchableWithoutFeedback>
      </View>
    </LayoutScreen>
  );
};

const styles = StyleSheet.create({
  headerSection: {
    alignItems: 'center',
    marginBottom: 32,
    paddingTop: 8,
  },
  title: {
    marginBottom: 12,
    fontWeight: '700',
    textAlign: 'center',
    fontSize: 28,
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 15,
    lineHeight: 22,
    paddingHorizontal: 20,
  },
  card: {
    borderRadius: 24,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  form: {
    gap: 20,
    marginBottom: 35,
  },
  captionText: {
    marginTop: 6,
    fontSize: 12,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginTop: -8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  registerLink: {
    fontWeight: '700',
  },
});
