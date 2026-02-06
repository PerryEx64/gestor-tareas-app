import { body } from 'express-validator';

export const validateRegister = [
  body('firstname')
    .notEmpty()
    .withMessage('is_required')
    .bail()
    .isString()
    .withMessage('string_invalid'),

  body('lastname')
    .notEmpty()
    .withMessage('is_required')
    .bail()
    .isString()
    .withMessage('string_invalid'),

  body('email')
    .notEmpty()
    .withMessage('is_required')
    .bail()
    .isEmail()
    .withMessage('email_invalid'),

  body('password')
    .notEmpty()
    .withMessage('is_required')
    .bail()
    .isLength({ min: 6 })
    .withMessage('characters_minimum_6'),
];

export const validateLogin = [
  body('email').isEmail().withMessage('email must be a valid email address'),
  body('password').notEmpty().withMessage('password is required'),
];
