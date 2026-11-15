import React from 'react';
import renderer, { act } from 'react-test-renderer';

import { Path } from '../../../src/navigation/constants';
import { useSignInViewModel } from '../../../src/viewmodels/SignInViewModel';

describe('useSignInViewModel', () => {
  const createNavigation = () => ({
    navigate: jest.fn(),
  });

  const renderHook = (navigation = createNavigation()) => {
    let latest: ReturnType<typeof useSignInViewModel>;
    const Harness = () => {
      latest = useSignInViewModel(navigation as never);
      return null;
    };

    renderer.act(() => {
      renderer.create(<Harness />);
    });

    return { getVm: () => latest, navigation };
  };

  it('keeps email, password, and visibility as local form state', () => {
    const { getVm } = renderHook();

    act(() => {
      getVm().setEmail('ada@example.com');
      getVm().setPassword('secret');
      getVm().onTogglePasswordVisibility();
    });

    expect(getVm().email).toBe('ada@example.com');
    expect(getVm().password).toBe('secret');
    expect(getVm().isPasswordVisible).toBe(true);
  });

  it('navigates to Sign Up and keeps other actions empty', () => {
    const { getVm, navigation } = renderHook();

    expect(() => {
      getVm().onSignIn();
      getVm().onForgotPassword();
      getVm().onContinueWithApple();
      getVm().onContinueWithGoogle();
      getVm().onSignUp();
    }).not.toThrow();

    expect(navigation.navigate).toHaveBeenCalledWith(Path.SignUp);
  });
});
