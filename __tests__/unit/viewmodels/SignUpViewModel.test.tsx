import React from 'react';
import renderer, { act } from 'react-test-renderer';

import { Path } from '../../../src/navigation/constants';
import { useSignUpViewModel } from '../../../src/viewmodels/SignUpViewModel';

describe('useSignUpViewModel', () => {
  const createNavigation = () => ({
    navigate: jest.fn(),
  });

  const renderHook = (navigation = createNavigation()) => {
    let latest: ReturnType<typeof useSignUpViewModel>;
    const Harness = () => {
      latest = useSignUpViewModel(navigation as never);
      return null;
    };

    renderer.act(() => {
      renderer.create(<Harness />);
    });

    return { getVm: () => latest, navigation };
  };

  it('keeps form fields and visibility as local state', () => {
    const { getVm } = renderHook();

    act(() => {
      getVm().setEmail('ada@example.com');
      getVm().setPassword('secret');
      getVm().setConfirmPassword('secret');
      getVm().onTogglePasswordVisibility();
      getVm().onToggleConfirmPasswordVisibility();
    });

    expect(getVm().email).toBe('ada@example.com');
    expect(getVm().password).toBe('secret');
    expect(getVm().confirmPassword).toBe('secret');
    expect(getVm().isPasswordVisible).toBe(true);
    expect(getVm().isConfirmPasswordVisible).toBe(true);
  });

  it('navigates to Sign In and keeps other actions empty', () => {
    const { getVm, navigation } = renderHook();

    expect(() => {
      getVm().onCreateAccount();
      getVm().onContinueWithApple();
      getVm().onContinueWithGoogle();
      getVm().onSignIn();
    }).not.toThrow();

    expect(navigation.navigate).toHaveBeenCalledWith(Path.SignIn);
  });
});
