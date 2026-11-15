import React, { useRef } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  TextInput,
  View,
} from 'react-native';

import {
  ActionButton,
  AppSaveAreaView,
  BaseText,
} from '../../components';
import {
  AppleIcon,
  EmailIcon,
  EyeIcon,
  EyeOffIcon,
  GoogleIcon,
  LockIcon,
  TaskListIcon,
} from '../../assets/icons/svg';
import { Colors } from '../../core/theme/colors';
import { useSignInViewModel } from '../../viewmodels/SignInViewModel';
import styles from './styles';

import type { SignInScreenProps } from '../../navigation/types';

const ICON_SIZE = 20;

const SignInScreen: React.FC<SignInScreenProps> = ({ navigation }) => {
  const {
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
  } = useSignInViewModel(navigation);
  const passwordRef = useRef<React.ElementRef<typeof TextInput>>(null);

  return (
    <AppSaveAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          style={styles.flex}
          contentContainerStyle={styles.formContent}
          keyboardShouldPersistTaps='handled'
          keyboardDismissMode='interactive'
          automaticallyAdjustKeyboardInsets
          showsVerticalScrollIndicator={false}
        >
          <View>
            <View style={styles.brandSection}>
              <View style={styles.brandMark} accessibilityRole='image'>
                <TaskListIcon
                  width={32}
                  height={32}
                  color={Colors.labelOngoing}
                />
              </View>
              <BaseText isBold style={styles.brandName}>
                Task Manager
              </BaseText>
            </View>

            <View style={styles.headingSection}>
              <BaseText isBold style={styles.heading}>
                Welcome back
              </BaseText>
              <BaseText style={styles.subtitle}>Sign in to continue</BaseText>
            </View>

            <View style={styles.inputRow}>
              <View style={styles.inputIcon}>
                <EmailIcon
                  width={ICON_SIZE}
                  height={ICON_SIZE}
                  color={Colors.neutral}
                />
              </View>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder='Email'
                placeholderTextColor={Colors.neutral}
                keyboardType='email-address'
                autoCapitalize='none'
                autoCorrect={false}
                autoComplete='email'
                textContentType='emailAddress'
                returnKeyType='next'
                onSubmitEditing={() => passwordRef.current?.focus()}
                accessibilityLabel='Email'
              />
            </View>

            <View style={styles.inputRow}>
              <View style={styles.inputIcon}>
                <LockIcon
                  width={ICON_SIZE}
                  height={ICON_SIZE}
                  color={Colors.neutral}
                />
              </View>
              <TextInput
                ref={passwordRef}
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                placeholder='Password'
                placeholderTextColor={Colors.neutral}
                secureTextEntry={!isPasswordVisible}
                autoCapitalize='none'
                autoCorrect={false}
                autoComplete='password'
                textContentType='password'
                returnKeyType='done'
                accessibilityLabel='Password'
              />
              <Pressable
                accessibilityRole='button'
                accessibilityLabel={
                  isPasswordVisible ? 'Hide password' : 'Show password'
                }
                hitSlop={8}
                onPress={onTogglePasswordVisibility}
              >
                {isPasswordVisible ? (
                  <EyeOffIcon
                    width={ICON_SIZE}
                    height={ICON_SIZE}
                    color={Colors.neutral}
                  />
                ) : (
                  <EyeIcon
                    width={ICON_SIZE}
                    height={ICON_SIZE}
                    color={Colors.neutral}
                  />
                )}
              </Pressable>
            </View>

            <Pressable
              accessibilityRole='button'
              accessibilityLabel='Forgot password'
              onPress={onForgotPassword}
              style={({ pressed }) => [
                styles.forgotPassword,
                { opacity: pressed ? 0.7 : 1 },
              ]}
            >
              <BaseText style={styles.forgotPasswordText}>Forgot password?</BaseText>
            </Pressable>

            <ActionButton
              fullScreenWidth
              onPress={onSignIn}
              style={styles.primaryButton}
            >
              <BaseText isBold style={styles.primaryButtonText}>
                Sign In
              </BaseText>
            </ActionButton>

            <View style={styles.dividerRow}>
              <View style={styles.divider} />
              <BaseText style={styles.dividerLabel}>Or continue with</BaseText>
              <View style={styles.divider} />
            </View>

            <View style={styles.socialRow}>
              <ActionButton
                fullScreenWidth
                onPress={onContinueWithApple}
                style={styles.socialButton}
                contentStyle={styles.socialContent}
              >
                <AppleIcon width={14} height={18} color={Colors.textLight} />
                <BaseText isBold style={styles.socialButtonText}>
                  Continue with Apple
                </BaseText>
              </ActionButton>
              <ActionButton
                fullScreenWidth
                onPress={onContinueWithGoogle}
                style={styles.socialButton}
                contentStyle={styles.socialContent}
              >
                <GoogleIcon width={18} height={18} />
                <BaseText isBold style={styles.socialButtonText}>
                  Continue with Google
                </BaseText>
              </ActionButton>
            </View>
          </View>

          <View style={styles.footer}>
            <BaseText style={styles.footerText}>Don't have an account? </BaseText>
            <Pressable
              accessibilityRole='button'
              accessibilityLabel='Sign Up'
              hitSlop={8}
              onPress={onSignUp}
              style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
            >
              <BaseText isBold style={styles.signUpText}>
                Sign Up
              </BaseText>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </AppSaveAreaView>
  );
};

export default SignInScreen;
