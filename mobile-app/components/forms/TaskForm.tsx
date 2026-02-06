import { Controller, useForm } from 'react-hook-form';
import { View, StyleSheet } from 'react-native';
import { Icon, Layout, Text } from '@ui-kitten/components';
import { TaskBodyCreate, TaskBodyUpdate } from '../../types/tasks.types';
import { Button } from '../Button';
import { defaultValidate } from '../../utils/rules-form';
import { TaskStatusChip } from '../../screens/private/tasks/components/TaskStatusChip';
import { BottomSheetInput } from '../BottomSheetInput';
import { useMemo } from 'react';

interface TaskCreateFormProps {
  onSubmit: (data: TaskBodyCreate | TaskBodyUpdate) => void;
  isLoading?: boolean;
  initialValues?: TaskBodyUpdate;
  mode?: 'create' | 'edit';
}
type IconName = 'think' | 'pending' | 'in_progress' | 'completed';

export const TaskForm = (props: TaskCreateFormProps) => {
  const { onSubmit, isLoading, initialValues, mode = 'create' } = props;
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<TaskBodyCreate>({
    defaultValues: initialValues as any,
  });

  const renderCaption = (message?: string) => {
    if (!message) {
      return null;
    }
    return (
      <Text style={styles.captionText} status="danger">
        {message}
      </Text>
    );
  };

  const currentStatus = watch('status');

  const getIconName: IconName = useMemo(() => {
    switch (currentStatus) {
      case 'pending':
        return 'pending';
      case 'in_progress':
        return 'in_progress';
      case 'completed':
        return 'completed';
      default:
        return 'think';
    }
  }, [currentStatus]);

  const isEditMode = mode === 'edit';

  return (
    <Layout style={styles.container}>
      <View style={styles.header}>
        <Icon
          name={getIconName}
          pack="assets"
          style={{ width: 65, height: 65 }}
        />
        <Text category="h5" style={styles.title}>
          {isEditMode ? 'Editar Tarea' : 'Nueva Tarea'}
        </Text>
        <Text category="p2" appearance="hint" style={styles.subtitle}>
          {isEditMode
            ? 'Modifica los detalles de tu tarea'
            : 'Completa los detalles para crear tu tarea'}
        </Text>
      </View>

      <View style={styles.form}>
        <Controller
          name="status"
          control={control}
          rules={defaultValidate}
          render={({ field: { value, onChange } }) => {
            return (
              <TaskStatusChip
                value={value}
                onChange={onChange}
                messageError={errors.status?.message}
              />
            );
          }}
        />

        <Controller
          name="title"
          control={control}
          rules={defaultValidate}
          render={({ field: { value, onBlur, onChange } }) => {
            return (
              <BottomSheetInput
                value={value}
                label="Título"
                placeholder="Nombre de la tarea"
                onBlur={onBlur}
                onChangeText={onChange}
                caption={renderCaption(errors.title?.message)}
                autoCapitalize="sentences"
                size="large"
              />
            );
          }}
        />

        <Controller
          name="description"
          control={control}
          rules={defaultValidate}
          render={({ field: { value, onBlur, onChange } }) => {
            return (
              <BottomSheetInput
                value={value}
                label="Descripción"
                placeholder="Describe la tarea"
                onBlur={onBlur}
                onChangeText={onChange}
                status={errors.description ? 'danger' : 'basic'}
                caption={renderCaption(errors.description?.message)}
                autoCapitalize="sentences"
                multiline
                numberOfLines={4}
                size="large"
              />
            );
          }}
        />

        <Button
          onPress={handleSubmit(onSubmit)}
          disabled={isLoading}
          size="large"
        >
          {isEditMode ? 'Guardar Cambios' : 'Crear Tarea'}
        </Button>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  header: {
    marginBottom: 24,
    alignItems: 'center',
  },
  title: {
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 14,
  },
  form: {
    gap: 20,
    marginBottom: 25,
  },
  label: {
    marginBottom: 8,
    fontSize: 12,
    fontWeight: '700',
  },
  captionText: {
    marginTop: 6,
    fontSize: 12,
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
});
