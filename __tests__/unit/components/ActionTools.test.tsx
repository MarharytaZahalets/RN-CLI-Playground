import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { TextInput } from 'react-native';

import ActionTools from '../../../src/components/ActionTools/ActionTools';

jest.mock('../../../src/components', () => {
  const ReactNative = jest.requireActual('react-native');
  const { Text, TouchableOpacity } = ReactNative;

  return {
    ActionButton: ({
      children,
      onPress,
    }: {
      children: React.ReactNode;
      onPress: () => void;
    }) => (
      <TouchableOpacity onPress={onPress}>
        <Text>{children}</Text>
      </TouchableOpacity>
    ),
    BaseText: ({ children }: { children: React.ReactNode }) => <Text>{children}</Text>,
  };
});

describe('ActionTools search', () => {
  it('filters as the user types and shows a clear control', () => {
    const onSearchBy = jest.fn();
    let component: renderer.ReactTestRenderer;

    renderer.act(() => {
      component = renderer.create(
        <ActionTools
          onAddTask={jest.fn()}
          onSearchBy={onSearchBy}
          statusFilter='all'
          onStatusFilterChange={jest.fn()}
        />,
      );
    });

    const input = component!.root.findByType(TextInput);

    act(() => {
      input.props.onChangeText('task');
    });

    expect(onSearchBy).toHaveBeenCalledWith('task');
    expect(component!.root.findByProps({ accessibilityLabel: 'Clear search' })).toBeTruthy();

    act(() => {
      component!.root.findByProps({ accessibilityLabel: 'Clear search' }).props.onPress();
    });

    expect(onSearchBy).toHaveBeenCalledWith('');
    expect(component!.root.findByType(TextInput).props.value).toBe('');
    expect(
      component!.root.findAllByProps({ accessibilityLabel: 'Clear search' }),
    ).toHaveLength(0);
  });

  it('disables search and chips while keeping add available', () => {
    const onStatusFilterChange = jest.fn();
    const onAddTask = jest.fn();
    let component: renderer.ReactTestRenderer;

    renderer.act(() => {
      component = renderer.create(
        <ActionTools
          onAddTask={onAddTask}
          onSearchBy={jest.fn()}
          statusFilter='all'
          onStatusFilterChange={onStatusFilterChange}
          filtersDisabled
        />,
      );
    });

    const input = component!.root.findByType(TextInput);
    expect(input.props.editable).toBe(false);
    expect(input.props.accessibilityState).toEqual({ disabled: true });
    expect(onStatusFilterChange).not.toHaveBeenCalled();
    expect(onAddTask).not.toHaveBeenCalled();
  });
});
