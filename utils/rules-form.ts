import { RegisterOptions } from 'react-hook-form';

type Validate = Pick<
  RegisterOptions,
  'pattern' | 'required' | 'minLength' | 'maxLength'
>;

export const defaultValidate: Validate = {
  required: {
    message: 'Campo Requerido',
    value: true,
  },
  pattern: {
    value: /^[0-9a-zA-ZáéíóúÁÉÍÓÚñÑ\s-_.,&]+$/,
    message: 'No se permite el uso de caracteres especiales',
  },
};

export const emailValidation: Validate = {
  required: {
    value: true,
    message: 'El correo electrónico es requerido',
  },
  pattern: {
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    message: 'Ingresa un correo electrónico válido',
  },
};

export const passwordValidation: Validate = {
  required: {
    value: true,
    message: 'La contraseña es requerida',
  },
  minLength: {
    value: 6,
    message: 'La contraseña debe tener al menos 6 caracteres',
  },
};
