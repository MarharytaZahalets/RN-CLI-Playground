import React from 'react';
import { Pressable, View } from 'react-native';

import { BaseText } from '..';
import styles from './styles';
import { APP_STATIC_ICONS, STATUS_ICONS } from '../../core/constants/icons';
import { dateString, formatCalendarDate } from '../../core/utils/utils';

import type { Task, TaskStatus } from '../../models/TaskList';

interface TaskCardProps {
  task: Task;
  onPress: () => void;
}

const STATUS_BADGE: Record<TaskStatus, object> = {
  ongoing: styles.badgeOngoing,
  inProcess: styles.badgeInProcess,
  done: styles.badgeDone,
  canceled: styles.badgeCanceled,
};

const TaskCard: React.FC<TaskCardProps> = React.memo(({ task, onPress }) => {
  const date = task.dueDate ? formatCalendarDate(task.dueDate) : dateString(task.createdAt);

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
    >
      <View style={styles.row}>
        <View style={[styles.badge, STATUS_BADGE[task.status]]}>
          {STATUS_ICONS[task.status]}
        </View>
        <BaseText isBold numberOfLines={1} ellipsizeMode={'tail'} style={styles.title}>
          {task.title}
        </BaseText>
      </View>

      <BaseText style={styles.description} ellipsizeMode={'tail'} numberOfLines={3}>
        {task.description}
      </BaseText>

      <View style={styles.dateRow}>
        {APP_STATIC_ICONS.calendar}
        <BaseText style={styles.date}>{date}</BaseText>
      </View>
    </Pressable>
  );
});

export default TaskCard;
