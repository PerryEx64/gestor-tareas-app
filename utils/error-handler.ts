import { AxiosError } from 'axios';
import { ApiError } from '../types/api.types';

export const handlerError = (error: any) => {
  if (error instanceof AxiosError && error.response) {
    const apiError = error.response.data as ApiError;
    return getMessageError(apiError);
  }
  return 'Error desconocido';
};

const getMessageError = (apiError: ApiError) => {
  const error = apiError.errors[0];
  let errorMessage = 'Error desconocido';
  const relativeName = getRelativeName(error.field);
  if (error.code == 'not_unique') {
    return (errorMessage = `${relativeName} ya existe.`);
  }
  switch (error.message) {
    case 'string_invalid':
      errorMessage = `El campo ${relativeName} no es un texto.`;
      break;
    case 'email_invalid':
      errorMessage = `El campo ${relativeName} no es un correo electrónico válido.`;
      break;
    case 'is_required':
      errorMessage = `El campo ${relativeName} es obligatorio.`;
      break;
    case 'characters_minimum_6':
      errorMessage = `El campo ${relativeName} debe tener al menos 6 caracteres.`;
      break;
    case 'email_not_found':
      errorMessage = `El correo electrónico no existe.`;
      break;
    case 'invalid_password':
      errorMessage = `La contraseña es incorrecta.`;
      break;
    case 'characters_between_3_100':
      errorMessage = `El campo ${relativeName} debe tener entre 3 y 100 caracteres.`;
      break;
    case 'uuid_invalid':
      errorMessage = `El campo ${relativeName} no es un válido.`;
      break;
    case 'status_invalid':
      errorMessage = `El campo ${relativeName} tiene un estado inválido.`;
      break;
    case 'characters_maximum_500':
      errorMessage = `El campo ${relativeName} debe tener máximo 500 caracteres.`;
      break;
    default:
      errorMessage = `Error en el campo ${relativeName}`;
  }

  return errorMessage;
};

export const getRelativeName = (name: string) => {
  switch (name) {
    case 'firstname':
      return 'nombre';
    case 'lastname':
      return 'apellido';
    case 'email':
      return 'correo electrónico';
    case 'password':
      return 'contraseña';
    case 'user_id':
      return 'ID de usuario';
    default:
      return name;
  }
};
