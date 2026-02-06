import { TaskContext } from './TaskContext';
import { ReactNode, useCallback, useState } from 'react';
import { Task } from '../types/tasks.types';
import Toast from 'react-native-toast-message';
import { getTasks } from '../services/TasksService';
import { useFocusEffect } from '@react-navigation/native';
import { useUserData } from '../hooks/useUser';
import { handlerError } from '../utils/error-handler';

export interface TaskContextProviderProps {
  children: ReactNode;
}

export const TaskContextProvider = (props: TaskContextProviderProps) => {
  const { children } = props;
  const [tasks, setTasks] = useState<Task[]>([]);
  const userData = useUserData();
  const [isLoading, setIsLoading] = useState(false);

  const fetchTasks = useCallback(() => {
    if (!userData?.id) {
      Toast.show({
        type: 'error',
        text1: 'Error al cargar tareas',
      });
      return;
    }
    setIsLoading(true);

    getTasks(userData.id)
      .then(setTasks)
      .catch((e) => {
        const message = handlerError(e);
        Toast.show({
          type: 'error',
          text1: message,
        });
      })
      .finally(() => setIsLoading(false));
  }, []);
  useFocusEffect(fetchTasks);

  const onAddLocalTask = useCallback((newTask: Task) => {
    setTasks((prevTasks) => [newTask, ...prevTasks]);
  }, []);

  const onUpdateLocalTask = useCallback((updatedTask: Task) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  }, []);

  const onDeleteLocalTask = useCallback((deletedTaskId: string) => {
    setTasks((prevTasks) =>
      prevTasks.filter((task) => task.id !== deletedTaskId)
    );
  }, []);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        setTasks,
        isLoading,
        onAddLocalTask,
        onUpdateLocalTask,
        onDeleteLocalTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
