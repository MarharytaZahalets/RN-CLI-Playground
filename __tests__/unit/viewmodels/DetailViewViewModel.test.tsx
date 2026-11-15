import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { SheetManager } from 'react-native-actions-sheet';

import { toCalendarDate } from '../../../src/core/utils/utils';
import { useDetailViewModel } from '../../../src/viewmodels/DetailViewViewModel';

const mockAddTask = jest.fn();
const mockUpdateTask = jest.fn();
const mockDeleteTask = jest.fn();
const mockGoBack = jest.fn();

jest.mock('react-native-actions-sheet', () => ({
  SheetManager: {
    show: jest.fn(),
    hide: jest.fn(),
  },
}));

jest.mock('../../../src/viewmodels/TaskListViewModel', () => ({
  useTaskViewModel: () => ({
    addTask: mockAddTask,
    updateTask: mockUpdateTask,
    deleteTask: mockDeleteTask,
    loading: false,
    error: null,
  }),
}));

const newTaskParams = {
  id: '',
  title: 'New',
  description: 'D',
  createdAt: new Date(),
  status: 'ongoing' as const,
};

describe('useDetailViewModel mutations', () => {
  const navigation = { goBack: mockGoBack } as never;
  const route = { params: newTaskParams } as never;

  let latest: ReturnType<typeof useDetailViewModel>;

  const Harness = () => {
    latest = useDetailViewModel(route, navigation);
    return null;
  };

  beforeEach(() => {
    jest.resetAllMocks();
    renderer.act(() => {
      renderer.create(<Harness />);
    });
  });

  it('navigates back after a successful create', async () => {
    mockAddTask.mockResolvedValueOnce(true);

    await act(async () => {
      await latest.onSave();
    });

    expect(mockAddTask).toHaveBeenCalled();
    expect(mockGoBack).toHaveBeenCalled();
  });

  it('stays on screen when create fails', async () => {
    mockAddTask.mockResolvedValueOnce(false);

    await act(async () => {
      await latest.onSave();
    });

    expect(mockGoBack).not.toHaveBeenCalled();
  });

  it('stays on screen when delete fails', async () => {
    mockDeleteTask.mockResolvedValueOnce(false);

    await act(async () => {
      await latest.onDelete();
    });

    expect(mockGoBack).not.toHaveBeenCalled();
  });

  it('creates a task without a due date', async () => {
    mockAddTask.mockResolvedValueOnce(true);

    expect(latest.updatedTask.dueDate).toBeNull();

    await act(async () => {
      await latest.onSave();
    });

    expect(mockAddTask).toHaveBeenCalledWith(
      expect.objectContaining({ dueDate: null }),
    );
  });

  it('persists today’s date when it is selected', async () => {
    mockAddTask.mockResolvedValueOnce(true);
    const today = new Date();

    act(() => {
      latest.onDueDateSelected(today);
    });

    expect(latest.updatedTask.dueDate).toBe(toCalendarDate(today));

    await act(async () => {
      await latest.onSave();
    });

    expect(mockAddTask).toHaveBeenCalledWith(
      expect.objectContaining({ dueDate: toCalendarDate(today) }),
    );
  });

  it('persists a selected due date when creating a task', async () => {
    mockAddTask.mockResolvedValueOnce(true);

    act(() => {
      latest.openDueDatePicker();
      latest.onDueDateSelected(new Date(2026, 8, 22));
    });

    expect(SheetManager.show).toHaveBeenCalledWith(
      'due-date-picker',
      expect.objectContaining({
        payload: expect.objectContaining({ date: null }),
      }),
    );
    expect(latest.updatedTask.dueDate).toBe('2026-09-22');

    await act(async () => {
      await latest.onSave();
    });

    expect(mockAddTask).toHaveBeenCalledWith(
      expect.objectContaining({ dueDate: '2026-09-22' }),
    );
  });

  it('clears a due date and persists null', async () => {
    mockUpdateTask.mockResolvedValueOnce(true);
    let vm: ReturnType<typeof useDetailViewModel>;
    const UpdateHarness = () => {
      vm = useDetailViewModel(
        {
          params: { ...newTaskParams, id: '1', dueDate: '2026-09-22' },
        } as never,
        navigation,
      );
      return null;
    };

    renderer.act(() => {
      renderer.create(<UpdateHarness />);
    });

    act(() => {
      vm.clearDueDate();
    });

    expect(vm.updatedTask.dueDate).toBeNull();

    await act(async () => {
      await vm.onSave();
    });

    expect(mockUpdateTask).toHaveBeenCalledWith(
      '1',
      expect.objectContaining({ dueDate: null }),
    );
  });

  it('keeps an existing due date when editing a task', async () => {
    mockUpdateTask.mockResolvedValueOnce(true);
    let vm: ReturnType<typeof useDetailViewModel>;
    const UpdateHarness = () => {
      vm = useDetailViewModel(
        {
          params: { ...newTaskParams, id: '1', dueDate: '2026-09-22' },
        } as never,
        navigation,
      );
      return null;
    };

    renderer.act(() => {
      renderer.create(<UpdateHarness />);
    });

    expect(vm.updatedTask.dueDate).toBe('2026-09-22');

    await act(async () => {
      await vm.onSave();
    });

    expect(mockUpdateTask).not.toHaveBeenCalled();
  });

  it('keeps one description value across the expanded editor', async () => {
    mockAddTask.mockResolvedValueOnce(true);

    act(() => {
      latest.setDescription('From compact field');
      latest.openDescriptionEditor();
    });

    expect(latest.isDescriptionEditorVisible).toBe(true);
    expect(latest.updatedTask.description).toBe('From compact field');

    act(() => {
      latest.setDescription('From expanded editor');
      latest.closeDescriptionEditor();
    });

    expect(latest.isDescriptionEditorVisible).toBe(false);
    expect(latest.updatedTask.description).toBe('From expanded editor');

    await act(async () => {
      await latest.onSave();
    });

    expect(mockAddTask).toHaveBeenCalledWith(
      expect.objectContaining({ description: 'From expanded editor' }),
    );
  });
});

describe('useDetailViewModel status sheet', () => {
  const navigation = { goBack: mockGoBack } as never;

  const renderWithStatus = (status: typeof newTaskParams.status) => {
    let latest: ReturnType<typeof useDetailViewModel>;
    const Harness = () => {
      latest = useDetailViewModel(
        { params: { ...newTaskParams, id: '1', status } } as never,
        navigation,
      );
      return null;
    };

    renderer.act(() => {
      renderer.create(<Harness />);
    });

    return () => latest;
  };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it.each([
    ['ongoing', 'Ongoing'],
    ['inProcess', 'In process'],
    ['done', 'Done'],
    ['canceled', 'Cancel'],
  ] as const)('selects %s when the sheet opens', (status, label) => {
    const getVm = renderWithStatus(status);

    act(() => {
      getVm().openChangeStatus();
    });

    const payload = (SheetManager.show as jest.Mock).mock.calls[0][1].payload;
    const selected = payload.items.filter((item: { selected?: boolean }) => item.selected);

    expect(selected).toHaveLength(1);
    expect(selected[0].field).toBe(label);
  });
});
