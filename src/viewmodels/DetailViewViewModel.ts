import { useCallback, useRef, useState } from 'react';

import { SheetManager } from 'react-native-actions-sheet';

import { TASK_STATUS_FIELDS } from '../core/constants/ui';
import { generateId, hasChanges, toCalendarDate } from '../core/utils/utils';
import { useTaskViewModel } from './TaskListViewModel';

import type { NavigationProp, RouteProp } from '@react-navigation/native';
import type { Task, TaskStatus } from '../models/TaskList';
import type { RootStackParamList } from '../navigation/types';

type DetailTask = {
  title: string;
  description: string;
  status: TaskStatus;
  id: string;
  createdAt: Date;
  dueDate: string | null;
};

export const useDetailViewModel = (
  route: RouteProp<RootStackParamList, 'DetailView'>,
  navigation: NavigationProp<RootStackParamList, 'DetailView'>,
) => {
  const { id, createdAt, title, description, status, dueDate } = route.params;
  const [updatedTask, setUpdatedTask] = useState<DetailTask>({
    title,
    description,
    status,
    createdAt,
    id,
    dueDate: dueDate ?? null,
  });
  const [isDescriptionEditorVisible, setIsDescriptionEditorVisible] = useState(false);

  const lastAction = useRef<'save' | 'delete' | null>(null);
  const [didAttemptMutation, setDidAttemptMutation] = useState(false);

  const { addTask, deleteTask, updateTask, loading, error } = useTaskViewModel({
    fetchOnMount: false,
  });

  const setStatusAndClose = useCallback((task: DetailTask) => {
    setUpdatedTask(task);
    SheetManager.hide('app-action-sheet');
  }, []);

  const openChangeStatus = () => {
    SheetManager.show('app-action-sheet', {
      payload: {
        title: 'Choose status',
        items: [
          {
            id: '1',
            field: TASK_STATUS_FIELDS.ongoing,
            selected: updatedTask.status === 'ongoing',
            onPress: () => setStatusAndClose({ ...updatedTask, status: 'ongoing' }),
          },
          {
            id: '2',
            field: TASK_STATUS_FIELDS.inProcess,
            selected: updatedTask.status === 'inProcess',
            onPress: () => setStatusAndClose({ ...updatedTask, status: 'inProcess' }),
          },
          {
            id: '3',
            field: TASK_STATUS_FIELDS.done,
            selected: updatedTask.status === 'done',
            onPress: () => setStatusAndClose({ ...updatedTask, status: 'done' }),
          },
          {
            id: '4',
            field: TASK_STATUS_FIELDS.canceled,
            selected: updatedTask.status === 'canceled',
            onPress: () => setStatusAndClose({ ...updatedTask, status: 'canceled' }),
          },
        ],
      },
    });
  };

  const setTitle = (titleString: string) => {
    setUpdatedTask({ ...updatedTask, title: titleString });
  };

  const setDescription = (descriptionString: string) => {
    setUpdatedTask({ ...updatedTask, description: descriptionString });
  };

  const openDescriptionEditor = () => {
    setIsDescriptionEditorVisible(true);
  };

  const closeDescriptionEditor = () => {
    setIsDescriptionEditorVisible(false);
  };

  const onDueDateSelected = (date: Date) => {
    setUpdatedTask({ ...updatedTask, dueDate: toCalendarDate(date) });
  };

  const clearDueDate = () => {
    setUpdatedTask({ ...updatedTask, dueDate: null });
  };

  const openDueDatePicker = () => {
    SheetManager.show('due-date-picker', {
      payload: {
        date: updatedTask.dueDate,
        onConfirm: onDueDateSelected,
      },
    });
  };

  const onSave = async () => {
    if (loading) {
      return;
    }

    lastAction.current = 'save';
    setDidAttemptMutation(true);
    let success = true;
    const payload: Task = {
      ...updatedTask,
      dueDate: updatedTask.dueDate,
    };

    if (!id) {
      success = await addTask({
        ...payload,
        id: generateId(),
        createdAt: new Date(),
      });
    } else if (
      hasChanges(
        { ...route.params, dueDate: route.params.dueDate ?? null },
        updatedTask,
        ['title', 'description', 'status', 'dueDate'],
      )
    ) {
      success = await updateTask(id, payload);
    }

    if (success) {
      navigation.goBack();
    }
  };

  const onDelete = async () => {
    if (loading) {
      return;
    }

    lastAction.current = 'delete';
    setDidAttemptMutation(true);
    const success = await deleteTask(id);

    if (success) {
      navigation.goBack();
    }
  };

  const onRetry = () => {
    if (lastAction.current === 'delete') {
      onDelete();
      return;
    }

    onSave();
  };

  return {
    updatedTask,
    loading,
    error: didAttemptMutation ? error : null,
    isDescriptionEditorVisible,
    setTitle,
    setDescription,
    openDescriptionEditor,
    closeDescriptionEditor,
    openChangeStatus,
    openDueDatePicker,
    onDueDateSelected,
    clearDueDate,
    onSave,
    onDelete,
    onRetry,
  };
};
