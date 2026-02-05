import { User } from './user.types';

export interface LoginResponse {
  message: string;
  token: string;
  user: User;
}

export interface RegisterBody extends Omit<User, 'id'> {
  password: string;
}
