import { Controller, useForm } from 'react-hook-form';
import { View, StyleSheet } from 'react-native';
import { Text } from '@ui-kitten/components';
import { TaskBodyCreate, TaskBodyUpdate } from '../../types/tasks.types';
import { Input } from '../Input';
import { Button } from '../Button';
import { defaultValidate } from '../../utils/rules-form';
import { useEffect } from 'react';
import { TaskStatusChip } from '../../screens/private/tasks/components/TaskStatusChip';

interface TaskCreateFormProps {
  onSubmit: (data: TaskBodyCreate) => void;
  isLoading?: boolean;
  initialValues?: TaskBodyUpdate;
  mode?: 'create' | 'edit';
}

export const TaskCreateForm = (props: TaskCreateFormProps) => {
  const { onSubmit, isLoading, initialValues, mode = 'create' } = props;
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<TaskBodyCreate>({
    defaultValues: initialValues as any,
  });

  // Inicializa el campo status en el formulario (sin UI para seleccionarlo)
  useEffect(() => {
    if (initialValues) {
      reset(initialValues as any);
      setValue('status', (initialValues as any).status || 'pending');
    } else {
      setValue('status', 'pending');
    }
  }, [initialValues, reset, setValue]);

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

  const isEditMode = mode === 'edit';

  return (
    <View style={styles.container}>
      <View style={styles.header}>
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
              <Input
                value={value}
                label="Título"
                placeholder="Nombre de la tarea"
                onBlur={onBlur}
                onChangeText={onChange}
                status={errors.title ? 'danger' : 'basic'}
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
              <Input
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
                textStyle={styles.textArea}
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
    </View>
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
