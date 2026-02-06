import { TaskStatusType } from '../../../../types/tasks.types';
import { View } from 'react-native';
import { Chip } from '../../../../components/Chip';
import { ButtonProps, Text } from '@ui-kitten/components';
import { BottomSheetFlatList } from '@gorhom/bottom-sheet';

interface SelectedStatus {
  label: string;
  value: TaskStatusType;
  color: ButtonProps['status'];
  icon?: string;
}

const STATUS: SelectedStatus[] = [
  { label: 'Pendiente', value: 'pending', color: 'warning', icon: 'pending' },
  {
    label: 'En Progreso',
    value: 'in_progress',
    color: 'info',
    icon: 'in_progress',
  },
  {
    label: 'Completada',
    value: 'completed',
    color: 'success',
    icon: 'completed',
  },
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
      <BottomSheetFlatList
        style={{ marginVertical: 10 }}
        keyExtractor={(item: SelectedStatus) => item.value}
        contentContainerStyle={{ gap: 8 }}
        data={STATUS}
        horizontal={true}
        renderItem={({ item }: { item: SelectedStatus }) => {
          return (
            <Chip
              selected={value == item.value}
              color={item.color}
              label={item.label}
              icon={item.icon}
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
