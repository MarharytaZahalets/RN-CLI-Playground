import { dateString, formatCalendarDate, parseCalendarDate } from './utils';

import type { Task } from '../../models/TaskList';

export type TaskStatusFilter = 'all' | 'inProgress' | 'completed' | 'overdue';

export const STATUS_FILTER_CHIPS: { id: TaskStatusFilter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'inProgress', label: 'In progress' },
  { id: 'completed', label: 'Completed' },
  { id: 'overdue', label: 'Overdue' },
];

const startOfDay = (value: Date): Date =>
  new Date(value.getFullYear(), value.getMonth(), value.getDate());

export const isOverdueTask = (task: Task, now: Date = new Date()): boolean => {
  if (task.status === 'done' || task.status === 'canceled' || !task.dueDate) {
    return false;
  }

  const due = parseCalendarDate(task.dueDate);
  if (!due) {
    return false;
  }

  return startOfDay(due) < startOfDay(now);
};

export const matchesStatusFilter = (
  task: Task,
  filter: TaskStatusFilter,
  now: Date = new Date(),
): boolean => {
  switch (filter) {
    case 'all':
      return true;
    case 'inProgress':
      return task.status === 'inProcess';
    case 'completed':
      return task.status === 'done';
    case 'overdue':
      return isOverdueTask(task, now);
  }
};

export const matchesSearchQuery = (task: Task, query: string): boolean => {
  if (!query) {
    return true;
  }

  const normalized = query.toLowerCase();
  const date = dateString(task.createdAt);
  const dueDate = task.dueDate
    ? `${task.dueDate} ${formatCalendarDate(task.dueDate)}`.toLowerCase()
    : '';

  return (
    task.title.toLowerCase().includes(normalized) ||
    task.description.toLowerCase().includes(normalized) ||
    date.includes(normalized) ||
    dueDate.includes(normalized) ||
    task.status.toLowerCase().includes(normalized)
  );
};
