import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { TextInput } from 'react-native';

import SignInScreen from '../../../src/screens/SignInScreen/SignInScreen';
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

describe('SignInScreen integration', () => {
  const createNavigation = () => ({
    navigate: jest.fn(),
  });

  it('renders the sign-in layout', () => {
    let component: renderer.ReactTestRenderer;
    const navigation = createNavigation();

    renderer.act(() => {
      component = renderer.create(
        <SignInScreen navigation={navigation as never} route={{} as never} />,
      );
    });

    const text = collectText(component!.root);

    expect(text).toContain('Task Manager');
    expect(text).toContain('Welcome back');
    expect(text).toContain('Sign in to continue');
    expect(text).toContain('Forgot password?');
    expect(text).toContain('Sign In');
    expect(text).toContain('Or continue with');
    expect(text).toContain('Continue with Apple');
    expect(text).toContain('Continue with Google');
    expect(text).toContain("Don't have an account?");
    expect(text).toContain('Sign Up');
  });

  it('updates email and toggles password visibility', () => {
    let component: renderer.ReactTestRenderer;
    const navigation = createNavigation();

    renderer.act(() => {
      component = renderer.create(
        <SignInScreen navigation={navigation as never} route={{} as never} />,
      );
    });

    const emailInput = component!.root.findByProps({ accessibilityLabel: 'Email' });
    const passwordInput = component!.root.findByProps({
      accessibilityLabel: 'Password',
    });

    expect(emailInput.type).toBe(TextInput);
    expect(passwordInput.props.secureTextEntry).toBe(true);

    act(() => {
      emailInput.props.onChangeText('ada@example.com');
    });

    expect(component!.root.findByProps({ accessibilityLabel: 'Email' }).props.value).toBe(
      'ada@example.com',
    );

    const showPassword = component!.root.findByProps({
      accessibilityLabel: 'Show password',
    });

    act(() => {
      showPassword.props.onPress();
    });

    expect(
      component!.root.findByProps({ accessibilityLabel: 'Password' }).props
        .secureTextEntry,
    ).toBe(false);
  });

  it('navigates to Sign Up from the footer link', () => {
    const navigation = createNavigation();
    let component: renderer.ReactTestRenderer;

    renderer.act(() => {
      component = renderer.create(
        <SignInScreen navigation={navigation as never} route={{} as never} />,
      );
    });

    act(() => {
      component!.root.findByProps({ accessibilityLabel: 'Sign Up' }).props.onPress();
    });

    expect(navigation.navigate).toHaveBeenCalledWith(Path.SignUp);
  });
});
