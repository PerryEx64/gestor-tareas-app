import { Controller, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { Text } from '@ui-kitten/components';
import { FormLoginProps } from '../../types/auth.types';
import { useState } from 'react';
import { defaultValidate } from '../../utils/rules-form';
import { Button } from '../Button';
import { Input } from '../Input';

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

  const renderCaption = (message?: string) => {
    if (!message) {
      return null;
    }
    return <Text>{message}</Text>;
  };

  return (
    <View style={{ gap: 10 }}>
      <Controller
        name="email"
        control={control}
        rules={defaultValidate}
        render={({ field: { value, onBlur, onChange } }) => {
          return (
            <Input
              value={value}
              label="Contraseña"
              placeholder="Ingresa tu contraseña"
              onBlur={onBlur}
              onChangeText={onChange}
              status={errors.email ? 'danger' : 'basic'}
              caption={renderCaption(errors.email?.message)}
              secureTextEntry={secureTextEntry}
            />
          );
        }}
      />

      <Controller
        name="password"
        control={control}
        rules={defaultValidate}
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
            />
          );
        }}
      />

      <Button onPress={handleSubmit(onSubmit)}>Iniciar Sesión</Button>
    </View>
  );
};
