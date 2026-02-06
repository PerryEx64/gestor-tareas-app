import { createContext, Dispatch, SetStateAction } from 'react';
import { Task } from '../types/tasks.types';

interface TaskContextProps {
  tasks: Task[];
  setTasks: Dispatch<SetStateAction<Task[]>>;
  onAddLocalTask: (newTask: Task) => void;
  onUpdateLocalTask: (updatedTask: Task) => void;
  onDeleteLocalTask: (deletedTaskId: string) => void;
  isLoading: boolean;
}

const TaskContextInitValues: TaskContextProps = {
  tasks: [],
  setTasks: () => {},
  isLoading: false,
  onAddLocalTask: () => {},
  onUpdateLocalTask: () => {},
  onDeleteLocalTask: () => {},
};

export const TaskContext = createContext(TaskContextInitValues);
