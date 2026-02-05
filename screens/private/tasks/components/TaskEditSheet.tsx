import { BottomSheet } from '../../../../components/BottomSheet';
import { TaskCreateForm } from '../../../../components/forms/TaskCreateForm';
import { Task } from '../../../../types/tasks.types';

interface TaskEditSheetProps {
  task: Task | null;
  isOpen: boolean;
  onOpen: (isOpen: boolean) => void;
}
export const TaskEditSheet = (props: TaskEditSheetProps) => {
  const { task, isOpen, onOpen } = props;

  const onEditTask = () => {};

  if (!task) {
    return null;
  }

  return (
    <BottomSheet isOpen={isOpen} onOpen={onOpen} snapPoints={['80%']}>
      <TaskCreateForm
        onSubmit={onEditTask}
        mode="edit"
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
