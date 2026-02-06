import { BottomSheet } from '../../../../components/BottomSheet';
import { useState } from 'react';
import { View } from 'react-native';
import { Button } from '../../../../components/Button';
import { TaskForm } from '../../../../components/forms/TaskForm';
import Toast from 'react-native-toast-message';
import { TaskBodyCreate } from '../../../../types/tasks.types';
import { createTask } from '../../../../services/TasksService';
import { useUserData } from '../../../../hooks/useUser';
import { useTasks } from '../../../../hooks/useTasks';
import { handlerError } from '../../../../utils/error-handler';

export const TaskCreateSheet = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const userData = useUserData();
  const { onAddLocalTask } = useTasks();
  const onOpenSheet = () => {
    setIsOpen(true);
  };

  const onCreateTask = async (data: TaskBodyCreate) => {
    try {
      if (!userData?.id) {
        Toast.show({
          type: 'error',
          text1: 'Usuario no autenticado',
        });
        return;
      }

      setIsLoading(true);
      const newTask = await createTask({ ...data, user_id: userData.id });
      onAddLocalTask(newTask);
      setIsOpen(false);
      Toast.show({
        type: 'success',
        text1: 'Tarea creada exitosamente',
      });
    } catch (error) {
      const message = handlerError(error);
      Toast.show({
        type: 'error',
        text1: message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View>
      <Button onPress={onOpenSheet}>Crear Tarea</Button>
      <BottomSheet isOpen={isOpen} onOpen={setIsOpen} snapPoints={['67%']}>
        <TaskForm
          onSubmit={(data) => onCreateTask(data as TaskBodyCreate)}
          isLoading={isLoading}
          mode="create"
        />
      </BottomSheet>
    </View>
  );
};
