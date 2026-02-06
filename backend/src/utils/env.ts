import { config } from 'dotenv';
config();

interface EnvConfig {
  JWT_SECRET: string;
  NODE_ENV: string;
}

const validateEnv = (): EnvConfig => {
  const { JWT_SECRET, NODE_ENV } = process.env;

  if (!JWT_SECRET) {
    throw new Error('JWT_SECRET no está definida en las variables de entorno');
  }

  return {
    JWT_SECRET,
    NODE_ENV: NODE_ENV || 'development',
  };
};

export const env = validateEnv();
