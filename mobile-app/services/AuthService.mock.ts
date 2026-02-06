import { LoginResponse } from '../types/auth.types';

/**
 * Mock implementation for login
 */
export const mockLoginSuccess: LoginResponse = {
  message: 'Registration successful',
  user: {
    id: 'login devuelve algo',
    firstname: 'John',
    lastname: 'Doe',
    email: 'test@example.com',
  },
  token: 'mock-token-123',
};

export const mockLoginError = {
  status: 401,
  message: 'Invalid email or password',
};

export const onLogin = jest.fn();

/**
 * Mock implementation for registration
 */
export const mockRegisterSuccess: LoginResponse = {
  message: 'Registration successful',
  user: {
    id: 'mock-new-user-id',
    firstname: 'Jane',
    lastname: 'Smith',
    email: 'newuser@example.com',
  },
  token: 'mock-token-456',
};

export const mockRegisterError = {
  status: 409,
  errors: [
    {
      field: 'email',
      message: 'User.email must be unique',
      code: 'unique',
    },
  ],
};

export const mockRegisterValidationError = {
  status: 400,
  errors: [
    {
      field: '',
      message: 'Validation error: Missing required fields',
      code: 'validation',
    },
  ],
};
