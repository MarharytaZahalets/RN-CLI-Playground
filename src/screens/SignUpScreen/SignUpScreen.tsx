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
import { useSignUpViewModel } from '../../viewmodels/SignUpViewModel';
import styles from './styles';

import type { SignUpScreenProps } from '../../navigation/types';

const ICON_SIZE = 20;

const SignUpScreen: React.FC<SignUpScreenProps> = ({ navigation }) => {
  const {
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
  } = useSignUpViewModel(navigation);
  const passwordRef = useRef<React.ElementRef<typeof TextInput>>(null);
  const confirmPasswordRef = useRef<React.ElementRef<typeof TextInput>>(null);

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
                Create your account
              </BaseText>
              <BaseText style={styles.subtitle}>Let's get started</BaseText>
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
                returnKeyType='next'
                onSubmitEditing={() => confirmPasswordRef.current?.focus()}
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

            <View style={styles.inputRow}>
              <View style={styles.inputIcon}>
                <LockIcon
                  width={ICON_SIZE}
                  height={ICON_SIZE}
                  color={Colors.neutral}
                />
              </View>
              <TextInput
                ref={confirmPasswordRef}
                style={styles.input}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder='Confirm password'
                placeholderTextColor={Colors.neutral}
                secureTextEntry={!isConfirmPasswordVisible}
                autoCapitalize='none'
                autoCorrect={false}
                autoComplete='password'
                textContentType='password'
                returnKeyType='done'
                accessibilityLabel='Confirm password'
              />
              <Pressable
                accessibilityRole='button'
                accessibilityLabel={
                  isConfirmPasswordVisible
                    ? 'Hide confirm password'
                    : 'Show confirm password'
                }
                hitSlop={8}
                onPress={onToggleConfirmPasswordVisibility}
              >
                {isConfirmPasswordVisible ? (
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

            <ActionButton
              fullScreenWidth
              onPress={onCreateAccount}
              style={styles.primaryButton}
            >
              <BaseText isBold style={styles.primaryButtonText}>
                Create account
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
            <BaseText style={styles.footerText}>Already have an account? </BaseText>
            <Pressable
              accessibilityRole='button'
              accessibilityLabel='Sign In'
              hitSlop={8}
              onPress={onSignIn}
              style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
            >
              <BaseText isBold style={styles.signInText}>
                Sign In
              </BaseText>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </AppSaveAreaView>
  );
};

export default SignUpScreen;
