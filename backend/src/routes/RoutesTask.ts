import { Router } from 'express';
import * as TaskController from '../controllers/TaskController';
import {
  validateCreateTask,
  validateDeleteTask,
  validateGetTasks,
  validateUpdateTask,
} from '../validators/taskValidators';
import { validateRequest } from '../middlewares/validateRequest';
import { authenticate } from '../middlewares/auth';

const router = Router();
router.use(authenticate);
router.get(
  '/user/:userId',
  validateGetTasks,
  validateRequest,
  TaskController.getTasks
);
router.post(
  '/',
  validateCreateTask,
  validateRequest,
  TaskController.createTask
);
router.put(
  '/:id',
  validateUpdateTask,
  validateRequest,
  TaskController.updateTask
);
router.delete(
  '/:id',
  validateDeleteTask,
  validateRequest,
  TaskController.deleteTask
);

export default router;
