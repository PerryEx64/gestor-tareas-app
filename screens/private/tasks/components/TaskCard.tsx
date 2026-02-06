import { View, StyleSheet, Pressable } from 'react-native';
import { Card, Icon, Text } from '@ui-kitten/components';
import { Task } from '../../../../types/tasks.types';
import { getStatusColor, getStatusLabel } from '../taskHandlers';
import { useMemo } from 'react';

interface TaskCardProps {
  task: Task;
  onSelected: (tas: Task) => void;
}

export const TaskCard = (props: TaskCardProps) => {
  const { task, onSelected } = props;

  const isCompleted = task.status === 'completed';

  const getIconName = useMemo(() => {
    switch (task.status) {
      case 'pending':
        return 'pending';
      case 'in_progress':
        return 'in_progress';
      case 'completed':
        return 'completed';
      default:
        return 'think';
    }
  }, [task.status]);
  return (
    <Pressable
      style={({ pressed }) => [
        {
          transform: [{ scale: pressed ? 0.95 : 1 }],
        },
      ]}
      onPress={() => onSelected(task)}
    >
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

          <View
            style={[
              styles.statusBadge,
              { backgroundColor: getStatusColor(task.status) },
            ]}
          >
            <Text category="c1" style={styles.statusText}>
              {getStatusLabel(task.status)}
            </Text>
            <Icon
              name={getIconName}
              pack="assets"
              style={{ width: 20, height: 20 }}
            />
          </View>
        </View>
      </Card>
    </Pressable>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 5,
    width: 110,
  },
  statusText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 11,
  },
});
