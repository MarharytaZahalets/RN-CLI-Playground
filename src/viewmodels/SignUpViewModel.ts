import { useState } from 'react';

import { Path } from '../navigation/constants';

import type { SignUpScreenProps } from '../navigation/types';

export const useSignUpViewModel = (
  navigation: SignUpScreenProps['navigation'],
) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

  const onTogglePasswordVisibility = () => {
    setIsPasswordVisible((visible) => !visible);
  };

  const onToggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible((visible) => !visible);
  };

  const onCreateAccount = () => {};
  const onContinueWithApple = () => {};
  const onContinueWithGoogle = () => {};
  const onSignIn = () => {
    navigation.navigate(Path.SignIn);
  };

  return {
    email,
    password,
    confirmPassword,
    isPasswordVisible,
    isConfirmPasswordVisible,
    setEmail,
    setPassword,
    setConfirmPassword,
    onTogglePasswordVisibility,
    onToggleConfirmPasswordVisibility,
    onCreateAccount,
    onContinueWithApple,
    onContinueWithGoogle,
    onSignIn,
  };
};
