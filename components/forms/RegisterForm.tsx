import { Controller, useForm } from 'react-hook-form';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Text, Card } from '@ui-kitten/components';
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
import { LayoutScreen } from '../layouts/LayoutScreen';

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
    <LayoutScreen>
      <View style={styles.headerSection}>
        <Text category="h1" style={styles.title}>
          Crear Cuenta
        </Text>
        <Text category="p1" appearance="hint" style={styles.subtitle}>
          Únete y comienza a organizar tu vida
        </Text>
      </View>

      <Card style={styles.card} disabled>
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
                  placeholder="Tu nombre"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  status={errors.firstname ? 'danger' : 'basic'}
                  caption={renderCaption(errors.firstname?.message)}
                  autoCapitalize="words"
                  autoComplete="name"
                  textContentType="givenName"
                  size="large"
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
                  placeholder="Tu apellido"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  status={errors.lastname ? 'danger' : 'basic'}
                  caption={renderCaption(errors.lastname?.message)}
                  autoCapitalize="words"
                  autoComplete="name-family"
                  textContentType="familyName"
                  size="large"
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
                  placeholder="Mínimo 6 caracteres"
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

          <Button onPress={handleSubmit(onSubmit)} size="large">
            Crear Cuenta
          </Button>
        </View>
      </Card>

      <View style={styles.footer}>
        <Text appearance="hint" category="p1">
          ¿Ya tienes una cuenta?{' '}
        </Text>
        <TouchableWithoutFeedback onPress={handleLoginNavigation}>
          <Text status="primary" category="p1" style={styles.loginLink}>
            Inicia sesión
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
    marginBottom: 24,
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
    marginBottom: 28,
  },
  captionText: {
    marginTop: 6,
    fontSize: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  loginLink: {
    fontWeight: '700',
  },
});
