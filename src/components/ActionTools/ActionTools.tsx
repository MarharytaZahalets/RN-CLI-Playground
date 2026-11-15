import React, { useRef, useState } from 'react';
import { Pressable, ScrollView, TextInput, View } from 'react-native';

import { ActionButton, BaseText } from '..';
import styles from './styles';
import { CloseIcon } from '../../assets/icons/svg';
import { APP_STATIC_ICONS } from '../../core/constants/icons';
import { Colors } from '../../core/theme/colors';
import {
  STATUS_FILTER_CHIPS,
  type TaskStatusFilter,
} from '../../core/utils/filterTaskList';

interface ActionToolsProps {
  onAddTask: () => void;
  onSearchBy: (query: string) => void;
  statusFilter: TaskStatusFilter;
  onStatusFilterChange: (filter: TaskStatusFilter) => void;
  filtersDisabled?: boolean;
}

const ActionTools: React.FC<ActionToolsProps> = React.memo(
  ({
    onAddTask,
    onSearchBy,
    statusFilter,
    onStatusFilterChange,
    filtersDisabled = false,
  }) => {
    const [query, setQuery] = useState<string>('');
    const searchInputRef = useRef<React.ElementRef<typeof TextInput>>(null);

    const onChangeQuery = (value: string) => {
      setQuery(value);
      onSearchBy(value);
    };

    const onClearSearch = () => {
      setQuery('');
      onSearchBy('');
      searchInputRef.current?.focus();
    };

    return (
      <View style={styles.wrapper}>
        <View style={styles.container}>
          <View style={[styles.search, filtersDisabled && styles.searchDisabled]}>
            <View style={styles.searchIconButton}>{APP_STATIC_ICONS.search}</View>
            <TextInput
              ref={searchInputRef}
              value={query}
              onChangeText={onChangeQuery}
              style={styles.input}
              placeholder={'Search tasks...'}
              placeholderTextColor={Colors.neutral}
              autoCorrect={false}
              inputMode={'search'}
              returnKeyType={'search'}
              editable={!filtersDisabled}
              accessibilityLabel='Search tasks'
              accessibilityState={{ disabled: filtersDisabled }}
            />
            {query ? (
              <Pressable
                accessibilityRole='button'
                accessibilityLabel='Clear search'
                hitSlop={8}
                onPress={onClearSearch}
                style={({ pressed }) => [
                  styles.clearButton,
                  { opacity: pressed ? 0.7 : 1 },
                ]}
              >
                <CloseIcon width={14} height={14} color={Colors.neutral} />
              </Pressable>
            ) : null}
          </View>
          <ActionButton
            style={styles.addButton}
            containerStyle={styles.iconButtonWrap}
            onPress={onAddTask}
          >
            {APP_STATIC_ICONS.plus}
          </ActionButton>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chipRow}
        >
          {STATUS_FILTER_CHIPS.map((chip) => {
            const selected = statusFilter === chip.id;

            return (
              <Pressable
                key={chip.id}
                accessibilityRole='button'
                accessibilityState={{ selected, disabled: filtersDisabled }}
                disabled={filtersDisabled}
                onPress={() => onStatusFilterChange(chip.id)}
                style={({ pressed }) => [
                  styles.chip,
                  selected && styles.chipSelected,
                  filtersDisabled && styles.chipDisabled,
                  { opacity: filtersDisabled ? 0.4 : pressed ? 0.75 : 1 },
                ]}
              >
                <BaseText
                  isBold={selected}
                  style={selected ? styles.chipLabelSelected : styles.chipLabel}
                >
                  {chip.label}
                </BaseText>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>
    );
  },
);

export default ActionTools;
