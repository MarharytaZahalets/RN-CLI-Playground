import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  TextInput,
  useWindowDimensions,
  View,
} from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import {
  ActionButton,
  AppSaveAreaView,
  BaseText,
  ErrorState,
  InputField,
} from '../../components';
import { APP_STATIC_ICONS, STATUS_ICONS } from '../../core/constants/icons';
import { TASK_FIELDS, TASK_STATUS_FIELDS } from '../../core/constants/ui';
import { Colors } from '../../core/theme/colors';
import { formatCalendarDate } from '../../core/utils/utils';
import styles from './styles';
import { useDetailViewModel } from '../../viewmodels/DetailViewViewModel';

import type { TaskStatus } from '../../models/TaskList';
import type { DetailViewScreenProps } from '../../navigation/types';

const STATUS_BADGE: Record<TaskStatus, object> = {
  ongoing: styles.badgeOngoing,
  inProcess: styles.badgeInProcess,
  done: styles.badgeDone,
  canceled: styles.badgeCanceled,
};

const compactDescriptionHeight = (windowHeight: number, keyboardHeight: number) => {
  const preferred = Math.round(windowHeight * 0.3);
  const half = Math.round(windowHeight * 0.45);
  const aboveKeyboard = keyboardHeight
    ? windowHeight - keyboardHeight - 180
    : half;
  return Math.max(120, Math.min(preferred, half, aboveKeyboard));
};

type DescriptionEditorModalProps = {
  visible: boolean;
  value: string;
  onChangeText: (value: string) => void;
  onClose: () => void;
};

const DescriptionEditorContent: React.FC<
  Omit<DescriptionEditorModalProps, 'visible'>
> = ({ value, onChangeText, onClose }) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.descriptionEditorRoot}>
      <StatusBar barStyle='light-content' />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View
          style={[
            styles.descriptionEditorSafe,
            {
              paddingTop: insets.top,
              paddingLeft: insets.left,
              paddingRight: insets.right,
            },
          ]}
        >
          <View style={styles.descriptionEditorHeader}>
            <View style={styles.descriptionEditorHeaderSide} />
            <BaseText isBold style={styles.descriptionEditorTitle}>
              Description
            </BaseText>
            <View style={styles.descriptionEditorHeaderTrailing}>
              <Pressable
                accessibilityRole='button'
                accessibilityLabel='Done'
                hitSlop={8}
                onPress={onClose}
              >
                <BaseText isBold style={styles.pickerDone}>
                  Done
                </BaseText>
              </Pressable>
            </View>
          </View>
          <TextInput
            style={[
              styles.descriptionEditorInput,
              { paddingBottom: Math.max(insets.bottom, 16) },
            ]}
            value={value}
            onChangeText={onChangeText}
            multiline
            scrollEnabled
            autoFocus
            textAlignVertical='top'
            returnKeyType='default'
            blurOnSubmit={false}
            placeholder='Enter your description here'
            placeholderTextColor={Colors.neutral}
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const DescriptionEditorModal: React.FC<DescriptionEditorModalProps> = ({
  visible,
  value,
  onChangeText,
  onClose,
}) => {
  return (
    <Modal
      visible={visible}
      animationType='slide'
      presentationStyle='fullScreen'
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <SafeAreaProvider style={styles.descriptionEditorRoot}>
        <DescriptionEditorContent
          value={value}
          onChangeText={onChangeText}
          onClose={onClose}
        />
      </SafeAreaProvider>
    </Modal>
  );
};

const DetailViewScreen: React.FC<DetailViewScreenProps> = ({ navigation, route }) => {
  const {
    updatedTask,
    loading,
    error,
    isDescriptionEditorVisible,
    setTitle,
    setDescription,
    openDescriptionEditor,
    closeDescriptionEditor,
    openChangeStatus,
    openDueDatePicker,
    clearDueDate,
    onSave,
    onDelete,
    onRetry,
  } = useDetailViewModel(route, navigation);
  const insets = useSafeAreaInsets();
  const { height: windowHeight } = useWindowDimensions();
  const isCreateMode = !route.params.id;
  const scrollRef = useRef<React.ElementRef<typeof ScrollView>>(null);
  const fieldOffsets = useRef<Record<string, number>>({});
  const [isFormScrollLocked, setIsFormScrollLocked] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const descriptionHeight = compactDescriptionHeight(windowHeight, keyboardHeight);

  useEffect(() => {
    const showEvent = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    const hideEvent = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';
    const show = Keyboard.addListener(showEvent, (event) => {
      setKeyboardHeight(event.endCoordinates.height);
    });
    const hide = Keyboard.addListener(hideEvent, () => {
      setKeyboardHeight(0);
    });

    return () => {
      show.remove();
      hide.remove();
    };
  }, []);

  const scrollFieldIntoView = (key: string) => {
    const y = fieldOffsets.current[key];
    if (y == null) {
      return;
    }

    scrollRef.current?.scrollTo({
      y: Math.max(y - 8, 0),
      animated: true,
    });
  };

  const onOpenDescriptionEditor = () => {
    Keyboard.dismiss();
    openDescriptionEditor();
  };

  return (
    <AppSaveAreaView style={styles.container} edges={['left', 'right']}>
      {loading ? <ActivityIndicator color={Colors.primary} size={'large'} /> : null}
      {error ? <ErrorState compact message={error} onRetry={onRetry} /> : null}
      {!loading && !error && (
        <>
          <ScrollView
            ref={scrollRef}
            style={styles.flex}
            contentContainerStyle={[
              styles.formContent,
              { paddingBottom: Math.max(insets.bottom, 24) },
            ]}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps='handled'
            keyboardDismissMode='interactive'
            automaticallyAdjustKeyboardInsets
            nestedScrollEnabled
            scrollEnabled={!isFormScrollLocked}
          >
            <View
              onLayout={(event) => {
                fieldOffsets.current.title = event.nativeEvent.layout.y;
              }}
            >
              <InputField
                fieldName={TASK_FIELDS.title}
                fieldValue={updatedTask.title}
                onChangeText={(value) => setTitle(value)}
                onFocus={() => scrollFieldIntoView('title')}
              />
            </View>
            <View
              onLayout={(event) => {
                fieldOffsets.current.description = event.nativeEvent.layout.y;
              }}
            >
              <BaseText style={styles.title} isBold>
                {TASK_FIELDS.description}
              </BaseText>
              <View
                style={[styles.descriptionField, { height: descriptionHeight }]}
                onTouchStart={() => setIsFormScrollLocked(true)}
                onTouchEnd={() => setIsFormScrollLocked(false)}
                onTouchCancel={() => setIsFormScrollLocked(false)}
              >
                <TextInput
                  style={styles.descriptionInput}
                  value={updatedTask.description}
                  onChangeText={setDescription}
                  multiline
                  scrollEnabled
                  textAlignVertical='top'
                  returnKeyType='default'
                  blurOnSubmit={false}
                  placeholder='Enter your description here'
                  placeholderTextColor={Colors.neutral}
                  onFocus={() => {
                    scrollFieldIntoView('description');
                  }}
                />
                <Pressable
                  accessibilityRole='button'
                  accessibilityLabel='Expand description'
                  hitSlop={8}
                  onPress={onOpenDescriptionEditor}
                  style={({ pressed }) => [
                    styles.expandButton,
                    { opacity: pressed ? 0.7 : 1 },
                  ]}
                >
                  {APP_STATIC_ICONS.expand}
                </Pressable>
              </View>
            </View>
            <View
              onLayout={(event) => {
                fieldOffsets.current.status = event.nativeEvent.layout.y;
              }}
            >
              <BaseText style={styles.title} isBold>
                Status
              </BaseText>
              <ActionButton
                style={styles.statusButton}
                contentStyle={styles.statusButtonContent}
                fullScreenWidth
                onPress={() => {
                  scrollFieldIntoView('status');
                  openChangeStatus();
                }}
              >
                <View style={styles.selector}>
                  <View style={[styles.badge, STATUS_BADGE[updatedTask.status]]}>
                    {STATUS_ICONS[updatedTask.status]}
                  </View>
                  <BaseText isBold style={styles.selectorLabel}>
                    {TASK_STATUS_FIELDS[updatedTask.status]}
                  </BaseText>
                  {APP_STATIC_ICONS.chevronDown}
                </View>
              </ActionButton>
            </View>
            <View
              onLayout={(event) => {
                fieldOffsets.current.dueDate = event.nativeEvent.layout.y;
              }}
            >
              <BaseText style={styles.title} isBold>
                Due date
              </BaseText>
              <View style={styles.selector}>
                <Pressable
                  accessibilityRole='button'
                  accessibilityLabel='Due date'
                  onPress={() => {
                    scrollFieldIntoView('dueDate');
                    openDueDatePicker();
                  }}
                  style={styles.dueDatePressable}
                >
                  <View style={styles.dateIcon}>{APP_STATIC_ICONS.calendar}</View>
                  <BaseText
                    style={[
                      styles.selectorLabel,
                      !updatedTask.dueDate && styles.placeholder,
                    ]}
                  >
                    {updatedTask.dueDate
                      ? formatCalendarDate(updatedTask.dueDate)
                      : 'Select a date'}
                  </BaseText>
                  {APP_STATIC_ICONS.chevronDown}
                </Pressable>
                {updatedTask.dueDate ? (
                  <Pressable
                    accessibilityRole='button'
                    accessibilityLabel='Clear due date'
                    hitSlop={8}
                    onPress={clearDueDate}
                    style={({ pressed }) => [
                      styles.clearDateButton,
                      { opacity: pressed ? 0.7 : 1 },
                    ]}
                  >
                    {APP_STATIC_ICONS.close}
                  </Pressable>
                ) : null}
              </View>
            </View>
            <View style={styles.actionButtonsContainer}>
              {isCreateMode ? (
                <ActionButton onPress={onSave} fullScreenWidth style={styles.saveButton}>
                  <BaseText isBold style={styles.actionButtonText}>
                    Save
                  </BaseText>
                </ActionButton>
              ) : (
                <>
                  <ActionButton
                    onPress={onDelete}
                    fullScreenWidth
                    style={styles.deleteButton}
                  >
                    <BaseText isBold style={styles.actionButtonText}>
                      Delete
                    </BaseText>
                  </ActionButton>
                  <ActionButton
                    onPress={onSave}
                    fullScreenWidth
                    style={styles.saveButton}
                  >
                    <BaseText isBold style={styles.actionButtonText}>
                      Save
                    </BaseText>
                  </ActionButton>
                </>
              )}
            </View>
          </ScrollView>
          <DescriptionEditorModal
            visible={isDescriptionEditorVisible}
            value={updatedTask.description}
            onChangeText={setDescription}
            onClose={closeDescriptionEditor}
          />
        </>
      )}
    </AppSaveAreaView>
  );
};

export default DetailViewScreen;
