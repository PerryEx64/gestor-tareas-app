import { View } from 'react-native';
import { LayoutScreen } from '../../../components/layouts/LayoutScreen';
import { TasksList } from './components/TasksList';
import { TaskCreateSheet } from './components/TaskCreateSheet';
import { TaskContextProvider } from '../../../store/TaskContextProvider';

export const TasksScreen = () => {
  return (
    <TaskContextProvider>
      <LayoutScreen level="1">
        <View style={{ gap: 10 }}>
          <TaskCreateSheet />
          <TasksList />
        </View>
      </LayoutScreen>
    </TaskContextProvider>
  );
};
