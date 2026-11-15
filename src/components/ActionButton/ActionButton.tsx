import React from 'react';
import { Pressable, View } from 'react-native';

import styles from './styles';

interface ActionButtonProps {
  children: React.ReactNode;
  onPress: () => void;
  style?: object;
  containerStyle?: object;
  contentStyle?: object;
  fullScreenWidth?: boolean;
  disabled?: boolean;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  onPress,
  style,
  containerStyle,
  contentStyle,
  children,
  fullScreenWidth = false,
  disabled = false,
}) => {
  const pressableStyle = ({ pressed }: { pressed: boolean }) => [
    styles.button,
    style,
    { opacity: disabled ? 0.4 : pressed ? 0.7 : 1 },
  ];

  if (fullScreenWidth) {
    return (
      <Pressable
        accessibilityState={{ disabled }}
        disabled={disabled}
        style={pressableStyle}
        onPress={onPress}
      >
        <View style={[styles.content, contentStyle]}>{children}</View>
      </Pressable>
    );
  }
  return (
    <View style={[styles.container, containerStyle]}>
      <Pressable
        accessibilityState={{ disabled }}
        disabled={disabled}
        style={pressableStyle}
        onPress={onPress}
      >
        <View style={styles.content}>{children}</View>
      </Pressable>
    </View>
  );
};

export default ActionButton;
