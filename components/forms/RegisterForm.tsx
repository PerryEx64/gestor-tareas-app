import { Controller, useForm } from 'react-hook-form';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Text } from '@ui-kitten/components';
import { RegisterBody } from '../../types/auth.types';
import { useState } from 'react';
import { Input } from '../Input';
import { Button } from '../Button';
import {
  defaultValidate,
  emailValidation,
  passwordValidation,
} from '../../utils/rules-form';
import { usePublicNavigation } from '../../hooks/usePublicNavigation';

interface RegisterFormProps {
  onSubmit: (data: RegisterBody) => void;
}

export const RegisterForm = (props: RegisterFormProps) => {
  const { onSubmit } = props;
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterBody>();
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const navigation = usePublicNavigation();

  const handleLoginNavigation = () => {
    navigation.navigate('login');
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
          Crear Cuenta
        </Text>
        <Text category="s1" appearance="hint" style={styles.subtitle}>
          Completa el formulario para empezar
        </Text>
      </View>

      <View style={styles.form}>
        <Controller
          name="firstname"
          control={control}
          rules={defaultValidate}
          render={({ field: { value, onBlur, onChange } }) => {
            return (
              <Input
                value={value}
                label="Nombre"
                placeholder="Ingresa tu nombre"
                onBlur={onBlur}
                onChangeText={onChange}
                status={errors.firstname ? 'danger' : 'basic'}
                caption={renderCaption(errors.firstname?.message)}
                autoCapitalize="words"
                autoComplete="name"
                textContentType="givenName"
              />
            );
          }}
        />

        <Controller
          name="lastname"
          control={control}
          rules={defaultValidate}
          render={({ field: { value, onBlur, onChange } }) => {
            return (
              <Input
                value={value}
                label="Apellido"
                placeholder="Ingresa tu apellido"
                onBlur={onBlur}
                onChangeText={onChange}
                status={errors.lastname ? 'danger' : 'basic'}
                caption={renderCaption(errors.lastname?.message)}
                autoCapitalize="words"
                autoComplete="name-family"
                textContentType="familyName"
              />
            );
          }}
        />

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
                placeholder="Mínimo 6 caracteres"
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
      </View>

      <Button onPress={handleSubmit(onSubmit)}>Crear Cuenta</Button>

      <View style={styles.footer}>
        <Text appearance="hint" category="c1">
          ¿Ya tienes una cuenta?{' '}
        </Text>
        <TouchableWithoutFeedback onPress={handleLoginNavigation}>
          <Text status="primary" category="c1" style={styles.loginLink}>
            Inicia sesión aquí
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
    marginBottom: 40,
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
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  loginLink: {
    fontWeight: 'bold',
  },
});
