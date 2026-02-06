import { getAutenticate } from './instanceAxios';
import { Task, TaskBodyCreate, TaskBodyUpdate } from '../types/tasks.types';

export const getTasks = async (userId: string) => {
  const https = await getAutenticate();
  const { data } = await https.get<Task[]>(`/tasks/user/${userId}`);
  return data;
};

export const createTask = async (body: TaskBodyCreate) => {
  const https = await getAutenticate();
  const { data } = await https.post<Task>(`/tasks`, body);
  return data;
};

export const updateTask = async (body: TaskBodyUpdate) => {
  const { id, ...rest } = body;
  const https = await getAutenticate();
  const { data } = await https.put<Task>(`/tasks/${id}`, rest);
  return data;
};

export const deleteTask = async (taskId: string) => {
  const https = await getAutenticate();
  await https.delete(`/tasks/${taskId}`);
};
