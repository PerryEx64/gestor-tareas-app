import { getAutenticate } from './instanceAxios';
import { LoginResponse, RegisterBody } from '../types/auth.types';

export const onLogin = async (email: string, password: string) => {
  const https = await getAutenticate();
  const { data } = await https.post<LoginResponse>('/login', {
    email,
    password,
  });
  return data;
};

export const onRegister = async (body: RegisterBody) => {
  const { firstname, lastname, email, password } = body;
  const https = await getAutenticate();
  const { data } = await https.post<LoginResponse>('/register', {
    firstname,
    lastname,
    email,
    password,
  });
  return data;
};
