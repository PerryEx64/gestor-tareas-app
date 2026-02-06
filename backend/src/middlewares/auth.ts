import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';

export interface AuthRequest extends Request {
  userId?: string;
  userEmail?: string;
}

export const authenticate = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ message: 'Token is required' });
      return;
    }

    const token = authHeader.substring(7);
    const decoded = verifyToken(token);

    req.userId = decoded.userId;
    req.userEmail = decoded.email;

    next();
    return;
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido o expirado' });
  }
};
