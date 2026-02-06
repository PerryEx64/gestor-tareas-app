import { User } from '../../database/models';
import * as uuid from 'uuid';
import * as bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { generateToken } from '../utils/jwt';
import { AppError, handleError } from '../utils/errorHandler';

export const register = async (req: Request, res: Response) => {
  try {
    const { firstname, lastname, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);

    const user = await User.create({
      id: uuid.v4(),
      firstname,
      lastname,
      email,
      password: hashedPassword,
    });

    const token = generateToken({
      userId: user.id,
      email: user.email,
    });

    res.status(200).json({
      message: 'Registration successful',
      token,
      user: {
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
      },
    });
  } catch (error) {
    handleError(error, res, 'registering user');
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new AppError(400, 'invalid email', [
        {
          field: 'email',
          message: 'email_not_found',
          code: 'not_found',
        },
      ]);
    }

    const passwordMatch = bcrypt.compareSync(password, user.password);
    if (!passwordMatch) {
      throw new AppError(400, 'invalid password', [
        {
          field: 'password',
          message: 'invalid_password',
          code: 'not_found',
        },
      ]);
    }

    const token = generateToken({
      userId: user.id,
      email: user.email,
    });

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
      },
    });
  } catch (error) {
    handleError(error, res, 'logging in user');
  }
};
