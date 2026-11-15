import React from 'react';
import { TextInput, TextInputProps, View } from 'react-native';

import { BaseText } from '..';
import styles from './styles';
import { Colors } from '../../core/theme/colors';

interface InputFieldProps extends Omit<TextInputProps, 'onChangeText'> {
  fieldName: string;
  fieldValue: string;
  onChangeText: (value: string) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  fieldName,
  fieldValue,
  onChangeText,
  style,
  ...props
}) => {
  return (
    <View>
      <BaseText style={styles.title} isBold>
        {fieldName}
      </BaseText>
      <TextInput
        style={[styles.input, style]}
        onChangeText={onChangeText}
        value={fieldValue}
        placeholder={'Enter your title here'}
        placeholderTextColor={Colors.neutral}
        {...props}
      />
    </View>
  );
};

export default InputField;
