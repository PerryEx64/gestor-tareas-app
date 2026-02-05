import { FlatList, View } from 'react-native';
import { Task } from '../../../../types/tasks.types';
import { TaskCard } from './TaskCard';
import { Spinner } from '@ui-kitten/components';

interface TasksListProps {
  data: Task[];
  isLoading: boolean;
}
export const TasksList = (props: TasksListProps) => {
  const { data, isLoading } = props;

  if (isLoading) {
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
        <Spinner size="giant" />
      </View>
    );
  }

  return (
    <FlatList
      data={data}
      style={{ padding: 5 }}
      keyExtractor={(item) => item.id}
      renderItem={({ item, index }) => <TaskCard task={item} />}
    />
  );
};
