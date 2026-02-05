import { TaskStatusType } from '../../../../types/tasks.types';
import { FlatList, View } from 'react-native';
import { Chip } from '../../../../components/Chip';
import { ButtonProps, Text } from '@ui-kitten/components';

interface SelectedStatus {
  label: string;
  value: TaskStatusType;
  color: ButtonProps['status'];
}

const STATUS: SelectedStatus[] = [
  { label: 'Pendiente', value: 'pending', color: 'warning' },
  { label: 'En Progreso', value: 'in_progress', color: 'info' },
  { label: 'Completada', value: 'completed', color: 'success' },
];

interface TaskStatusChipProps {
  value: TaskStatusType;
  onChange: (newStatus: TaskStatusType) => void;
  messageError?: string;
}
export const TaskStatusChip = (props: TaskStatusChipProps) => {
  const { value, onChange, messageError } = props;
  return (
    <View>
      <FlatList
        style={{ marginVertical: 10 }}
        keyExtractor={(item) => item.value}
        contentContainerStyle={{ gap: 8 }}
        data={STATUS}
        horizontal={true}
        renderItem={({ item }) => {
          return (
            <Chip
              selected={value == item.value}
              color={item.color}
              label={item.label}
              onPress={() => onChange(item.value)}
            />
          );
        }}
      />
      {messageError && (
        <Text style={{ marginTop: 6, fontSize: 12 }} status="danger">
          {messageError}
        </Text>
      )}
    </View>
  );
};
