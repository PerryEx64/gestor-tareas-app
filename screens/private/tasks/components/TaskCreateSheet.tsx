import { BottomSheet } from '../../../../components/BottomSheet';
import { useState } from 'react';
import { View } from 'react-native';
import { Button } from '../../../../components/Button';
import { TaskCreateForm } from '../../../../components/forms/TaskCreateForm';

export const TaskCreateSheet = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onOpenSheet = () => {
    setIsOpen(true);
  };

  return (
    <View>
      <Button onPress={onOpenSheet}>Crear Tarea</Button>
      <BottomSheet isOpen={isOpen} onOpen={setIsOpen} snapPoints={['60%']}>
        <TaskCreateForm onSubmit={() => {}} />
      </BottomSheet>
    </View>
  );
};
