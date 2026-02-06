import { Sequelize } from 'sequelize-typescript';
import { Task, User } from '../models';

const sequelize = new Sequelize('tasks_db', 'tasks_user', 'tasks_password', {
  host: 'mysql',
  dialect: 'mysql',
  port: Number(3306),
  timezone: '-06:00',
  dialectOptions: {
    connectTimeout: 10000,
  },
  retry: {
    max: 10,
    timeout: 3000,
  },
  models: [User, Task],
});

export default sequelize;
