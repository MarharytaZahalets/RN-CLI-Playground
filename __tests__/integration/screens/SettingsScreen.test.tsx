import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { TouchableOpacity } from 'react-native';

import SettingsScreen from '../../../src/screens/SettingsScreen/SettingsScreen';
import { Path } from '../../../src/navigation/constants';

jest.mock('../../../src/components', () => {
  const ReactNative = jest.requireActual('react-native');
  const { View } = ReactNative;

  return {
    AppSaveAreaView: ({ children }: { children: React.ReactNode }) => (
      <View>{children}</View>
    ),
  };
});

jest.mock('../../../src/components/SettingActionButton/SettingActionButton', () => {
  const ReactNative = jest.requireActual('react-native');
  const { TouchableOpacity, Text } = ReactNative;

  return ({ title, onPress }: { title: string; onPress: () => void }) => (
    <TouchableOpacity onPress={onPress}>
      <Text>{title}</Text>
    </TouchableOpacity>
  );
});

describe('SettingsScreen temporary auth shortcuts', () => {
  it('navigates to Sign In and Sign Up', () => {
    const navigation = { navigate: jest.fn(), pop: jest.fn() };
    let component: renderer.ReactTestRenderer;

    renderer.act(() => {
      component = renderer.create(
        <SettingsScreen navigation={navigation as never} route={{} as never} />,
      );
    });

    const buttons = component!.root.findAllByType(TouchableOpacity);
    const signIn = buttons.find((node) =>
      node.findAll((child) => child.props.children === 'Open Sign In').length,
    );
    const signUp = buttons.find((node) =>
      node.findAll((child) => child.props.children === 'Open Sign Up').length,
    );

    act(() => {
      signIn?.props.onPress();
    });
    act(() => {
      signUp?.props.onPress();
    });

    expect(navigation.navigate).toHaveBeenCalledWith(Path.SignIn);
    expect(navigation.navigate).toHaveBeenCalledWith(Path.SignUp);
  });
});
