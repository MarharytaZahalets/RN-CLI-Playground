import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { TextInput } from 'react-native';

import SignUpScreen from '../../../src/screens/SignUpScreen/SignUpScreen';
import { Path } from '../../../src/navigation/constants';

jest.mock('../../../src/components', () => {
  const ReactNative = jest.requireActual('react-native');
  const { View, Text, TouchableOpacity } = ReactNative;

  return {
    AppSaveAreaView: ({ children }: { children: React.ReactNode }) => (
      <View>{children}</View>
    ),
    BaseText: ({ children }: { children: React.ReactNode }) => <Text>{children}</Text>,
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
  };
});

const collectText = (root: renderer.ReactTestInstance): string => {
  return root
    .findAll((node) => typeof node.props.children === 'string')
    .map((node) => node.props.children as string)
    .join(' ');
};

describe('SignUpScreen integration', () => {
  const createNavigation = () => ({
    navigate: jest.fn(),
  });

  it('renders the sign-up layout', () => {
    let component: renderer.ReactTestRenderer;
    const navigation = createNavigation();

    renderer.act(() => {
      component = renderer.create(
        <SignUpScreen navigation={navigation as never} route={{} as never} />,
      );
    });

    const text = collectText(component!.root);

    expect(text).toContain('Task Manager');
    expect(text).toContain('Create your account');
    expect(text).toContain("Let's get started");
    expect(text).toContain('Create account');
    expect(text).toContain('Or continue with');
    expect(text).toContain('Continue with Apple');
    expect(text).toContain('Continue with Google');
    expect(text).toContain('Already have an account?');
    expect(text).toContain('Sign In');
  });

  it('updates fields, toggles visibility, and navigates to Sign In', () => {
    let component: renderer.ReactTestRenderer;
    const navigation = createNavigation();

    renderer.act(() => {
      component = renderer.create(
        <SignUpScreen navigation={navigation as never} route={{} as never} />,
      );
    });

    const emailInput = component!.root.findByProps({ accessibilityLabel: 'Email' });
    const passwordInput = component!.root.findByProps({
      accessibilityLabel: 'Password',
    });
    const confirmInput = component!.root.findByProps({
      accessibilityLabel: 'Confirm password',
    });

    expect(emailInput.type).toBe(TextInput);
    expect(passwordInput.props.secureTextEntry).toBe(true);
    expect(confirmInput.props.secureTextEntry).toBe(true);

    act(() => {
      emailInput.props.onChangeText('ada@example.com');
    });

    expect(component!.root.findByProps({ accessibilityLabel: 'Email' }).props.value).toBe(
      'ada@example.com',
    );

    act(() => {
      component!.root.findByProps({ accessibilityLabel: 'Show password' }).props.onPress();
      component!.root
        .findByProps({ accessibilityLabel: 'Show confirm password' })
        .props.onPress();
    });

    expect(
      component!.root.findByProps({ accessibilityLabel: 'Password' }).props
        .secureTextEntry,
    ).toBe(false);
    expect(
      component!.root.findByProps({ accessibilityLabel: 'Confirm password' }).props
        .secureTextEntry,
    ).toBe(false);

    act(() => {
      component!.root.findByProps({ accessibilityLabel: 'Sign In' }).props.onPress();
    });

    expect(navigation.navigate).toHaveBeenCalledWith(Path.SignIn);
  });
});
