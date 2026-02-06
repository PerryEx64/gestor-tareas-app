import { getAutenticate } from './instanceAxios';
import { Task, TaskBodyCreate, TaskBodyUpdate } from '../types/tasks.types';
import Toast from 'react-native-toast-message';

export const getTasks = async (userId: string) => {
  try {
    const https = await getAutenticate();
    const { data } = await https.get<Task[]>(`/tasks/user/${userId}`);
    return data;
  } catch (error) {
    Toast.show({
      type: 'error',
      text1: 'No se pudieron cargar las tareas',
      text2: 'Por favor, intenta nuevamente.',
    });
    throw error;
  }
};

export const createTask = async (body: TaskBodyCreate) => {
  try {
    const https = await getAutenticate();
    const { data } = await https.post<Task>(`/tasks`, body);
    return data;
  } catch (error) {
    Toast.show({
      type: 'error',
      text1: 'No se pudo crear la tarea',
      text2: 'Por favor, intenta nuevamente.',
    });
  }
};

export const updateTask = async (body: TaskBodyUpdate) => {
  try {
    const { id, ...rest } = body;
    const https = await getAutenticate();
    const { data } = await https.put<Task>(`/tasks/${id}`, rest);
    return data;
  } catch (error) {
    console.log('Error updating task:', JSON.stringify(error));
  }
};

export const deleteTask = async (taskId: string) => {
  try {
    const https = await getAutenticate();
    await https.delete(`/tasks/${taskId}`);
  } catch (error) {
    console.log('Error deleting task:', error);
    throw error;
  }
};
