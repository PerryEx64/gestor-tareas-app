import { Text, View } from 'react-native';
import { LayoutScreen } from '../../../components/layouts/LayoutScreen';
import { useCallback, useState } from 'react';
import { Task } from '../../../types/tasks.types';
import { useFocusEffect } from '@react-navigation/native';
import { getTasks } from '../../../services/TasksService';
import { useUserData } from '../../../hooks/useUser';
import Toast from 'react-native-toast-message';
import { Button } from '../../../components/Button';
import { usePrivateNavigation } from '../../../hooks/usePrivateNavigation';
import { TasksList } from './components/TasksList';

export const TasksScreen = () => {
  const [data, setData] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const userData = useUserData();
  const navigation = usePrivateNavigation();

  const onCreateTask = useCallback(() => {
    Toast.show({
      type: 'info',
      text1: 'Funcionalidad en desarrollo',
      text2: 'Abre sheet.',
    });
  }, [navigation]);

  const fetchTasks = useCallback(() => {
    if (!userData.id) {
      Toast.show({
        type: 'error',
        text1: 'Error al cargar tareas',
      });
      return;
    }
    setIsLoading(true);

    getTasks(userData.id)
      .then(setData)
      .finally(() => setIsLoading(false));
  }, []);
  useFocusEffect(fetchTasks);

  return (
    <LayoutScreen level="1">
      <Button status="primary" onPress={onCreateTask}>
        Crear Tarea
      </Button>
      <TasksList data={data} isLoading={isLoading} />
    </LayoutScreen>
  );
};
