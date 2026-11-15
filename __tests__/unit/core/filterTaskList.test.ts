import {
  isOverdueTask,
  matchesSearchQuery,
  matchesStatusFilter,
} from '../../../src/core/utils/filterTaskList';
import type { Task } from '../../../src/models/TaskList';

const now = new Date('2026-09-14T12:00:00');

const makeTask = (overrides: Partial<Task> = {}): Task => ({
  id: '1',
  title: 'Write docs',
  description: 'Create user flow',
  createdAt: new Date('2024-11-10'),
  status: 'inProcess',
  ...overrides,
});

describe('filterTaskList', () => {
  it('treats incomplete tasks with a past due date as overdue', () => {
    expect(
      isOverdueTask(makeTask({ status: 'ongoing', dueDate: '2026-09-13' }), now),
    ).toBe(true);
    expect(
      isOverdueTask(makeTask({ status: 'inProcess', dueDate: '2026-09-13' }), now),
    ).toBe(true);
  });

  it('does not treat completed or canceled tasks as overdue', () => {
    expect(
      isOverdueTask(makeTask({ status: 'done', dueDate: '2026-09-13' }), now),
    ).toBe(false);
    expect(
      isOverdueTask(makeTask({ status: 'canceled', dueDate: '2026-09-13' }), now),
    ).toBe(false);
  });

  it('does not treat tasks without a due date as overdue', () => {
    expect(isOverdueTask(makeTask({ status: 'inProcess' }), now)).toBe(false);
  });

  it('does not treat incomplete tasks due today as overdue', () => {
    expect(
      isOverdueTask(makeTask({ dueDate: '2026-09-14' }), now),
    ).toBe(false);
  });

  it('maps chips onto existing task statuses', () => {
    const inProcess = makeTask({ status: 'inProcess' });
    const done = makeTask({ status: 'done' });
    const ongoing = makeTask({ status: 'ongoing' });
    const overdue = makeTask({ status: 'inProcess', dueDate: '2026-09-01' });

    expect(matchesStatusFilter(inProcess, 'all', now)).toBe(true);
    expect(matchesStatusFilter(inProcess, 'inProgress', now)).toBe(true);
    expect(matchesStatusFilter(ongoing, 'inProgress', now)).toBe(false);
    expect(matchesStatusFilter(done, 'completed', now)).toBe(true);
    expect(matchesStatusFilter(inProcess, 'completed', now)).toBe(false);
    expect(matchesStatusFilter(inProcess, 'overdue', now)).toBe(false);
    expect(matchesStatusFilter(overdue, 'overdue', now)).toBe(true);
    expect(matchesStatusFilter(done, 'overdue', now)).toBe(false);
  });

  it('matches the existing search fields', () => {
    const task = makeTask({ dueDate: '2026-09-14' });
    expect(matchesSearchQuery(task, 'docs')).toBe(true);
    expect(matchesSearchQuery(task, 'user flow')).toBe(true);
    expect(matchesSearchQuery(task, 'inprocess')).toBe(true);
    expect(matchesSearchQuery(task, '2026-09-14')).toBe(true);
    expect(matchesSearchQuery(task, 'missing')).toBe(false);
    expect(matchesSearchQuery(task, '')).toBe(true);
  });
});
