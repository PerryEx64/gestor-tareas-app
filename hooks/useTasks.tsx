import { useContext } from 'react';
import { TaskContext } from '../store/TaskContext';

export const useTasks = () => {
  return useContext(TaskContext);
};
