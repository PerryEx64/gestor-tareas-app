import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Text } from '@ui-kitten/components';
import { Task } from '../../../../types/tasks.types';
import { useState } from 'react';

interface TaskCardProps {
  task: Task;
  onPress?: () => void;
  onStatusChange?: (newStatus: 'pending' | 'in_progress' | 'completed') => void;
}

export const TaskCard = (props: TaskCardProps) => {
  const { task, onPress, onStatusChange } = props;
  const [currentStatus, setCurrentStatus] = useState<
    'pending' | 'in_progress' | 'completed'
  >(task.status);

  const handleStatusPress = () => {
    let newStatus: 'pending' | 'in_progress' | 'completed';

    if (currentStatus === 'pending') {
      newStatus = 'in_progress';
    } else if (currentStatus === 'in_progress') {
      newStatus = 'completed';
    } else {
      newStatus = 'pending';
    }

    setCurrentStatus(newStatus);
    onStatusChange?.(newStatus);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return '#00E096';
      case 'in_progress':
        return '#3366FF';
      case 'pending':
        return '#FFAA00';
      default:
        return '#8F9BB3';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'Completada';
      case 'in_progress':
        return 'En Progreso';
      case 'pending':
        return 'Pendiente';
      default:
        return status;
    }
  };

  const isCompleted = currentStatus === 'completed';

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <Card style={styles.card} disabled>
        <View style={styles.content}>
          <View style={styles.leftSection}>
            <View style={styles.textContainer}>
              <Text
                category="s1"
                style={[styles.title, isCompleted && styles.titleCompleted]}
              >
                {task.title}
              </Text>
              {task.description && (
                <Text
                  category="p2"
                  appearance="hint"
                  style={[
                    styles.description,
                    isCompleted && styles.descriptionCompleted,
                  ]}
                  numberOfLines={2}
                >
                  {task.description}
                </Text>
              )}
            </View>
          </View>

          <TouchableOpacity
            onPress={handleStatusPress}
            activeOpacity={0.8}
            style={[
              styles.statusBadge,
              { backgroundColor: getStatusColor(currentStatus) },
            ]}
          >
            <Text category="c1" style={styles.statusText}>
              {getStatusLabel(currentStatus)}
            </Text>
          </TouchableOpacity>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 24,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  leftSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  textContainer: {
    flex: 1,
    gap: 6,
  },
  title: {
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 22,
  },
  titleCompleted: {
    textDecorationLine: 'line-through',
    opacity: 0.5,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
  },
  descriptionCompleted: {
    textDecorationLine: 'line-through',
    opacity: 0.4,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginLeft: 8,
  },
  statusText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 11,
  },
});
