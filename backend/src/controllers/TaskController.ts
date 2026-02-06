import { Request, Response } from 'express';
import { Task } from '../../database/models';
import * as uuid from 'uuid';
import { AppError, handleError } from '../utils/errorHandler';

export const getTasks = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const tasks = await Task.findAll({
      attributes: {
        exclude: ['user_id'],
      },
      where: { user_id: userId },
    });

    res.status(200).json(tasks);
  } catch (error) {
    handleError(error, res, 'retrieving tasks');
  }
};

export const createTask = async (req: Request, res: Response) => {
  try {
    const { title, description, user_id, status } = req.body;
    const newTask = await Task.create({
      id: uuid.v4(),
      title,
      description,
      user_id,
      status,
    });

    res.status(201).json(newTask);
  } catch (error) {
    handleError(error, res, 'creating task');
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;

    const [updatedRows] = await Task.update(
      { title, description, status },
      { where: { id } }
    );

    if (updatedRows === 0) {
      throw new AppError(404, 'Task not found', [
        {
          field: 'id',
          message: 'No task found with the provided ID',
          code: 'not_found',
        },
      ]);
    }

    const updatedTask = await Task.findByPk(id as string);
    res.status(200).json(updatedTask);
  } catch (error) {
    handleError(error, res, 'updating task');
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedRows = await Task.destroy({ where: { id } });

    if (deletedRows === 0) {
      throw new AppError(404, 'Task not found', [
        {
          field: 'id',
          message: 'No task found with the provided ID',
          code: 'not_found',
        },
      ]);
    }

    res.sendStatus(204);
  } catch (error) {
    handleError(error, res, 'deleting task');
  }
};
