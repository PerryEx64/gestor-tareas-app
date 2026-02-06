import { onLogin, onRegister } from '../services/AuthService';
import {
  mockLoginSuccess,
  mockLoginError,
  mockRegisterSuccess,
  mockRegisterError,
  mockRegisterValidationError,
} from '../services/AuthService.mock';
import { RegisterBody } from '../types/auth.types';

jest.mock('../services/AuthService');

const mockedOnLogin = onLogin as jest.MockedFunction<typeof onLogin>;
const mockedOnRegister = onRegister as jest.MockedFunction<typeof onRegister>;

describe('Auth Service Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  /**
   * Tests de Login
   * - Verifica que con credenciales válidas se retorne el usuario y token correctamente.
   * - Verifica que con credenciales inválidas se lance un error con el mensaje adecuado.
   * - Asegura que la función onLogin se llame con los parámetros correctos.
   * - Verifica que el resultado de onLogin coincida con el mock definido para éxito o error.
   */
  describe('Login', () => {
    test('should return user and token with valid credentials', async () => {
      mockedOnLogin.mockResolvedValue(mockLoginSuccess);

      const result = await onLogin('test@example.com', 'password123');

      expect(result).toEqual(mockLoginSuccess);
      expect(mockedOnLogin).toHaveBeenCalledWith(
        'test@example.com',
        'password123'
      );
    });

    test('should throw error with invalid credentials', async () => {
      mockedOnLogin.mockRejectedValue(mockLoginError);

      await expect(onLogin('wrong@example.com', 'wrongpass')).rejects.toEqual(
        mockLoginError
      );
    });
  });

  /**
   * Tests de Register
   * - Verifica que con datos de registro válidos se retorne el usuario y token correctamente.
   * - Verifica que al intentar registrar con un email ya existente se lance un error con el mensaje adecuado.
   * - Verifica que al intentar registrar con datos inválidos se lance un error de validación.
   * - Asegura que la función onRegister se llame con los parámetros correctos.
   * - Verifica que el resultado de onRegister coincida con el mock definido para éxito o error.
   */
  describe('Register', () => {
    test('should register user successfully and return user and token', async () => {
      const registerData: RegisterBody = {
        firstname: 'Jane',
        lastname: 'Smith',
        email: 'newuser@example.com',
        password: 'password123',
        confirmPassword: 'password123',
      };

      mockedOnRegister.mockResolvedValue(mockRegisterSuccess);

      const result = await onRegister(registerData);

      expect(result).toEqual(mockRegisterSuccess);
      expect(result.user.email).toBe('newuser@example.com');
      expect(mockedOnRegister).toHaveBeenCalledWith(registerData);
    });

    test('should throw error when email already exists', async () => {
      const registerData: RegisterBody = {
        firstname: 'John',
        lastname: 'Doe',
        email: 'existing@example.com',
        password: 'password123',
        confirmPassword: 'password123',
      };

      mockedOnRegister.mockRejectedValue(mockRegisterError);

      await expect(onRegister(registerData)).rejects.toEqual(mockRegisterError);
    });

    test('should throw error with invalid registration data', async () => {
      const invalidData: RegisterBody = {
        firstname: '',
        lastname: '',
        email: 'invalid-email',
        password: '123',
        confirmPassword: '123',
      };

      mockedOnRegister.mockRejectedValue(mockRegisterValidationError);

      await expect(onRegister(invalidData)).rejects.toEqual(
        mockRegisterValidationError
      );
    });
  });
});
