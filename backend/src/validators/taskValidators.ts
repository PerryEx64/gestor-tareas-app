import { body, param } from 'express-validator';

export const validateGetTasks = [
  param('userId').isUUID(4).withMessage('uuid_invalid'),
];

export const validateDeleteTask = [
  param('id').isUUID(4).withMessage('uuid_invalid'),
];

export const validateUpdateTask = [
  param('id').isUUID(4).withMessage('uuid_invalid'),

  body('title')
    .optional()
    .isString()
    .withMessage('string_invalid')
    .bail()
    .isLength({ min: 3, max: 100 })
    .withMessage('characters_between_3_100'),

  body('description').optional().isString().withMessage('string_invalid'),

  body('status')
    .optional()
    .isIn(['pending', 'in_progress', 'completed'])
    .withMessage('status_invalid'),
];

export const validateCreateTask = [
  body('title')
    .notEmpty()
    .withMessage('is_required')
    .bail()
    .isString()
    .withMessage('string_invalid')
    .bail()
    .isLength({ min: 3, max: 100 })
    .withMessage('characters_between_3_100'),

  body('description')
    .optional()
    .isString()
    .withMessage('string_invalid')
    .bail()
    .isLength({ max: 500 })
    .withMessage('characters_maximum_500'),

  body('user_id')
    .notEmpty()
    .withMessage('is_required')
    .bail()
    .isUUID(4)
    .withMessage('uuid_invalid'),

  body('status')
    .optional()
    .isIn(['pending', 'in_progress', 'completed'])
    .withMessage('status_invalid'),
];
