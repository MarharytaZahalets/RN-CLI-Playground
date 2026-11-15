import { useState } from 'react';

import { Path } from '../navigation/constants';

import type { SignInScreenProps } from '../navigation/types';

export const useSignInViewModel = (
  navigation: SignInScreenProps['navigation'],
) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const onTogglePasswordVisibility = () => {
    setIsPasswordVisible((visible) => !visible);
  };

  const onSignIn = () => {};
  const onForgotPassword = () => {};
  const onContinueWithApple = () => {};
  const onContinueWithGoogle = () => {};
  const onSignUp = () => {
    navigation.navigate(Path.SignUp);
  };

  return {
    email,
    password,
    isPasswordVisible,
    setEmail,
    setPassword,
    onTogglePasswordVisibility,
    onSignIn,
    onForgotPassword,
    onContinueWithApple,
    onContinueWithGoogle,
    onSignUp,
  };
};
