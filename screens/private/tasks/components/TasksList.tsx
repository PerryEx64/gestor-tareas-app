import { FlatList, View } from 'react-native';
import { Task } from '../../../../types/tasks.types';
import { TaskCard } from './TaskCard';
import { Spinner } from '@ui-kitten/components';
import { TaskEditSheet } from './TaskEditSheet';
import { useEffect, useState } from 'react';
import { useTasks } from '../../../../hooks/useTasks';

export const TasksList = () => {
  const { tasks, isLoading } = useTasks();
  const [taskSelected, setTaskSelected] = useState<Task | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (taskSelected) {
      setIsOpen(true);
    }
  }, [taskSelected]);

  const handleClose = () => {
    setIsOpen(false);
    setTaskSelected(null);
  };

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
          <TaskCard task={item} onSelected={setTaskSelected} />
        )}
      />
      <TaskEditSheet task={taskSelected} isOpen={isOpen} onOpen={handleClose} />
    </>
  );
};
