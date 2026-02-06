import { BottomSheet } from '../../../../components/BottomSheet';
import { TaskCreateForm } from '../../../../components/forms/TaskCreateForm';
import { Task, TaskBodyUpdate } from '../../../../types/tasks.types';
import Toast from 'react-native-toast-message';
import { updateTask } from '../../../../services/TasksService';
import { useState } from 'react';
import { useUserData } from '../../../../hooks/useUser';

interface TaskEditSheetProps {
  task: Task | null;
  isOpen: boolean;
  onOpen: (isOpen: boolean) => void;
}
export const TaskEditSheet = (props: TaskEditSheetProps) => {
  const { task, isOpen, onOpen } = props;
  const [isLoading, setIsLoading] = useState(false);
  const userData = useUserData();

  const onUpdateTask = async (data: TaskBodyUpdate) => {
    try {
      if (!userData?.id) {
        Toast.show({
          type: 'error',
          text1: 'Usuario no autenticado',
        });
        return;
      }

      setIsLoading(true);
      await updateTask(data);
      onOpen(false);
      Toast.show({
        type: 'success',
        text1: 'Tarea actualizada exitosamente',
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!task) {
    return null;
  }

  return (
    <BottomSheet isOpen={isOpen} onOpen={onOpen} snapPoints={['80%']}>
      <TaskCreateForm
        onSubmit={(data) => onUpdateTask(data as TaskBodyUpdate)}
        mode="edit"
        isLoading={isLoading}
        initialValues={{
          id: task.id,
          title: task.title,
          description: task.description,
          status: task.status,
        }}
      />
    </BottomSheet>
  );
};
