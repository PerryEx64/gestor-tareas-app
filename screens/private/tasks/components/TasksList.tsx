import { FlatList, View } from 'react-native';
import { Task } from '../../../../types/tasks.types';
import { TaskCard } from './TaskCard';
import { Spinner } from '@ui-kitten/components';
import { TaskEditSheet } from './TaskEditSheet';
import { useCallback, useEffect, useState } from 'react';
import { useTasks } from '../../../../hooks/useTasks';
import Toast from 'react-native-toast-message';
import { deleteTask } from '../../../../services/TasksService';

export const TasksList = () => {
  const { tasks, isLoading } = useTasks();
  const [taskSelected, setTaskSelected] = useState<Task | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const { onDeleteLocalTask } = useTasks();

  useEffect(() => {
    if (taskSelected) {
      setIsOpen(true);
    }
  }, [taskSelected]);

  const handleClose = () => {
    setIsOpen(false);
    setTaskSelected(null);
  };

  const onDelete = useCallback(async (id: string) => {
    try {
      await deleteTask(id);
      onDeleteLocalTask(id);
      Toast.show({
        type: 'success',
        text1: 'Tarea eliminada exitosamente',
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error al eliminar la tarea',
        text2: 'Por favor, intenta nuevamente.',
      });
    }
  }, []);

  if (isLoading) {
    return (
      <View style={{ alignItems: 'center', flex: 1 }}>
        <Spinner size="giant" status="warning" />
      </View>
    );
  }

  return (
    <>
      <FlatList
        data={tasks}
        style={{ padding: 5 }}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <TaskCard
            task={item}
            onSelected={setTaskSelected}
            onDelete={onDelete}
          />
        )}
      />
      <TaskEditSheet task={taskSelected} isOpen={isOpen} onOpen={handleClose} />
    </>
  );
};
