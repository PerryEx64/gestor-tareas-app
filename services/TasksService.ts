import { getAutenticate } from './instanceAxios';
import { Task, TaskBodyCreate, TaskBodyUpdate } from '../types/tasks.types';

export const getTasks = async (userId: string) => {
  try {
    const https = await getAutenticate();
    const { data } = await https.get<Task[]>(`/tasks/user/${userId}`);
    return data;
  } catch (error) {
    console.log('Error retrieving tasks:', error);
    throw error;
  }
};

export const createTask = async (body: TaskBodyCreate) => {
  try {
    const https = await getAutenticate();
    const { data } = await https.post<Task>(`/tasks`, body);
    return data;
  } catch (error) {
    console.log('Error creating task:', error);
    throw error;
  }
};

export const updateTask = async (body: TaskBodyUpdate) => {
  try {
    const { id, ...rest } = body;
    const https = await getAutenticate();
    const { data } = await https.put<Task>(`/tasks/${id}`, rest);
    return data;
  } catch (error) {
    console.log('Error updating task:', error);
    throw error;
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
