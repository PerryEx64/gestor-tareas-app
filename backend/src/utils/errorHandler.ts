import { Response } from 'express';
import { UniqueConstraintError, ValidationError } from 'sequelize';

export class AppError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public errors?: Array<{ field: string; message: string; code?: string }>
  ) {
    super(message);
  }
}

export const handleError = (
  error: unknown,
  res: Response,
  message?: string
) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      message: error.message,
      errors: error.errors,
    });
  }

  if (error instanceof UniqueConstraintError) {
    return res.status(409).json({
      errors: error.errors.map(err => ({
        field: err.path,
        message: err.message,
        code: err.validatorKey,
      })),
    });
  }

  if (error instanceof ValidationError) {
    return res.status(400).json({
      errors: error.errors.map(err => ({
        field: err.path,
        message: err.message,
        code: err.validatorKey,
      })),
    });
  }

  const messageToLog = message ?? 'Internal error';
  return res.status(500).json({ message: `Error: ${messageToLog}` });
};
