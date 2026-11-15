import React, { useEffect, useState } from 'react';
import { Pressable, View } from 'react-native';
import DateTimePicker, {
  type DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import ActionSheet, { SheetManager, type SheetProps } from 'react-native-actions-sheet';

import ActionButton from '../ActionButton/ActionButton';
import BaseText from '../BaseText/BaseText';
import { APP_STATIC_ICONS } from '../../core/constants/icons';
import { parseCalendarDate } from '../../core/utils/utils';
import sheetStyles from '../AppActionSheet/styles';
import styles from './styles';

const DueDatePickerSheet: React.FC<SheetProps<'due-date-picker'>> = ({ payload }) => {
  const initialDate = parseCalendarDate(payload?.date ?? '') ?? new Date();
  const [draftDate, setDraftDate] = useState(initialDate);

  useEffect(() => {
    setDraftDate(parseCalendarDate(payload?.date ?? '') ?? new Date());
  }, [payload?.date]);

  const onChange = (_event: DateTimePickerEvent, date?: Date) => {
    if (date) {
      setDraftDate(date);
    }
  };

  const onCancel = () => {
    SheetManager.hide('due-date-picker');
  };

  const onConfirm = () => {
    payload?.onConfirm(draftDate);
    SheetManager.hide('due-date-picker');
  };

  return (
    <ActionSheet
      gestureEnabled
      useBottomSafeAreaPadding
      containerStyle={sheetStyles.sheet}
      indicatorStyle={sheetStyles.indicator}
    >
      <View style={sheetStyles.container}>
        <View style={sheetStyles.headerRow}>
          <BaseText style={sheetStyles.header} isBold>
            Due date
          </BaseText>
          <Pressable
            accessibilityRole='button'
            accessibilityLabel='Close'
            hitSlop={8}
            onPress={onCancel}
            style={({ pressed }) => [
              sheetStyles.closeButton,
              { opacity: pressed ? 0.7 : 1 },
            ]}
          >
            {APP_STATIC_ICONS.close}
          </Pressable>
        </View>
        <DateTimePicker
          value={draftDate}
          mode='date'
          display='spinner'
          themeVariant='dark'
          onChange={onChange}
        />
        <ActionButton onPress={onConfirm} fullScreenWidth style={styles.doneButton}>
          <BaseText isBold style={styles.doneLabel}>
            Done
          </BaseText>
        </ActionButton>
      </View>
    </ActionSheet>
  );
};

export default DueDatePickerSheet;
