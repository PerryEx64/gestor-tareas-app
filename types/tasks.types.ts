export type TaskStatusType = 'pending' | 'in_progress' | 'completed';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatusType;
  created_at: Date;
  updated_at: Date;
}

export interface TaskBodyCreate extends Omit<
  Task,
  'id' | 'created_at' | 'updated_at'
> {
  userId: string;
}

export type TaskBodyUpdate = Omit<Task, 'created_at' | 'updated_at'>;
