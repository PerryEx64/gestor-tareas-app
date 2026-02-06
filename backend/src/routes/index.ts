import { Router } from 'express';
import routersTasks from './RoutesTask';
import * as AuthController from '../controllers/AuthController';
import { validateLogin, validateRegister } from '../validators/authValidators';
import { validateRequest } from '../middlewares/validateRequest';

const router = Router();

router.post(
  '/register',
  validateRegister,
  validateRequest,
  AuthController.register
);
router.post('/login', validateLogin, validateRequest, AuthController.login);
router.use('/tasks', routersTasks);
export default router;
