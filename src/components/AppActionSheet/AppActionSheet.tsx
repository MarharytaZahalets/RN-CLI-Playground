import React, { useEffect, useState } from 'react';
import { Pressable, View } from 'react-native';

import ActionSheet, { SheetManager, type SheetProps } from 'react-native-actions-sheet';

import { BaseText } from '..';
import styles from './styles';
import { APP_STATIC_ICONS, STATUS_ICONS } from '../../core/constants/icons';
import { TASK_STATUS_FIELDS } from '../../core/constants/ui';

import type { TaskStatus } from '../../models/TaskList';

export interface renderItemProps {
  id: string;
  field: string;
  onPress: () => void;
  selected?: boolean;
  disabled?: boolean;
}

export interface SheetSection {
  title: string;
  items: renderItemProps[];
}

const STATUS_DESCRIPTIONS: Record<TaskStatus, string> = {
  ongoing: 'Not started yet',
  inProcess: 'Currently working on it',
  done: 'Task is completed',
  canceled: 'Task is cancelled',
};

const STATUS_BADGE: Record<TaskStatus, object> = {
  ongoing: styles.badgeOngoing,
  inProcess: styles.badgeInProcess,
  done: styles.badgeDone,
  canceled: styles.badgeCanceled,
};

const statusFromLabel = (field: string): TaskStatus | null => {
  const match = (Object.entries(TASK_STATUS_FIELDS) as [TaskStatus, string][]).find(
    ([, label]) => label === field,
  );
  return match ? match[0] : null;
};

const AppActionSheet: React.FC<SheetProps<'app-action-sheet'>> = ({ payload }) => {
  const sections: SheetSection[] = payload?.sections?.length
    ? payload.sections
    : payload?.items?.length
    ? [{ title: '', items: payload.items }]
    : [];

  const [selectedIds, setSelectedIds] = useState<string[]>(() =>
    sections.map((section) => section.items.find((item) => item.selected)?.id ?? ''),
  );

  const payloadSelectionKey = sections
    .map((section) =>
      section.items.map((item) => `${item.id}:${item.selected ? '1' : '0'}`).join(','),
    )
    .join('|');

  // Keyed by encoded ids/selected flags so a new `sections` array each render
  // does not reset the in-sheet selection after a tap.
  useEffect(() => {
    setSelectedIds(
      sections.map((section) => section.items.find((item) => item.selected)?.id ?? ''),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps -- payloadSelectionKey
  }, [payloadSelectionKey]);

  const onItemPress = (sectionIndex: number, item: renderItemProps) => {
    const isOrderSection = sections[sectionIndex]?.title === 'Order';
    const sortBySectionIndex = sections.findIndex(
      (section) => section.title === 'Sort by',
    );
    const selectedSortId =
      sectionIndex === sortBySectionIndex ? item.id : selectedIds[sortBySectionIndex];

    if (isOrderSection && selectedSortId === 'field-default') {
      return;
    }

    setSelectedIds((current) => {
      const next = [...current];
      next[sectionIndex] = item.id;
      const orderSectionIndex = sections.findIndex(
        (section) => section.title === 'Order',
      );
      if (item.id === 'field-default') {
        if (orderSectionIndex >= 0) {
          next[orderSectionIndex] = '';
        }
      } else if (
        sectionIndex === sortBySectionIndex &&
        orderSectionIndex >= 0 &&
        !next[orderSectionIndex]
      ) {
        next[orderSectionIndex] = 'order-asc';
      }
      return next;
    });
    item.onPress();
  };

  return (
    <ActionSheet
      gestureEnabled
      useBottomSafeAreaPadding
      containerStyle={styles.sheet}
      indicatorStyle={styles.indicator}
    >
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <BaseText style={styles.header} isBold>
            {payload?.title}
          </BaseText>
          <Pressable
            accessibilityRole='button'
            accessibilityLabel='Close'
            hitSlop={8}
            onPress={() => SheetManager.hide('app-action-sheet')}
            style={({ pressed }) => [styles.closeButton, { opacity: pressed ? 0.7 : 1 }]}
          >
            {APP_STATIC_ICONS.close}
          </Pressable>
        </View>
        {sections.map((section, sectionIndex) => {
          const isOrderSection = section.title === 'Order';
          const sortBySectionIndex = sections.findIndex(
            (currentSection) => currentSection.title === 'Sort by',
          );
          const isDefaultSort =
            sortBySectionIndex >= 0 &&
            selectedIds[sortBySectionIndex] === 'field-default';
          const orderDisabled = isOrderSection && isDefaultSort;

          return (
            <View key={`${section.title}-${sectionIndex}`} style={styles.section}>
              {section.title ? (
                <BaseText style={styles.sectionTitle} isBold>
                  {section.title}
                </BaseText>
              ) : null}
              {isOrderSection ? (
                <View style={styles.chipRow}>
                  {section.items.map((item) => {
                    const isSelected =
                      !orderDisabled && selectedIds[sectionIndex] === item.id;

                    return (
                      <Pressable
                        key={item.id}
                        disabled={orderDisabled}
                        onPress={() => onItemPress(sectionIndex, item)}
                        style={({ pressed }) => [
                          styles.chip,
                          isSelected && styles.chipSelected,
                          orderDisabled && styles.chipDisabled,
                          { opacity: orderDisabled ? 0.4 : pressed ? 0.7 : 1 },
                        ]}
                      >
                        <BaseText
                          isBold={isSelected}
                          style={isSelected ? styles.chipTextSelected : styles.chipText}
                        >
                          {item.field}
                        </BaseText>
                      </Pressable>
                    );
                  })}
                </View>
              ) : (
                <View style={styles.list}>
                  {section.items.map((item) => {
                    const isSelected = selectedIds[sectionIndex] === item.id;
                    const status = statusFromLabel(item.field);
                    const isDestructive = status === 'canceled';

                    return (
                      <Pressable
                        key={item.id}
                        onPress={() => onItemPress(sectionIndex, item)}
                        style={({ pressed }) => [
                          styles.row,
                          isSelected && styles.rowSelected,
                          { opacity: pressed ? 0.72 : 1 },
                        ]}
                      >
                        {status ? (
                          <View style={[styles.badge, STATUS_BADGE[status]]}>
                            {STATUS_ICONS[status]}
                          </View>
                        ) : null}
                        <View style={styles.rowTextBlock}>
                          <BaseText
                            isBold={isSelected}
                            style={[
                              styles.rowText,
                              isDestructive && styles.rowTextDestructive,
                            ]}
                          >
                            {item.field}
                          </BaseText>
                          {status ? (
                            <BaseText style={styles.rowSubtitle}>
                              {STATUS_DESCRIPTIONS[status]}
                            </BaseText>
                          ) : null}
                        </View>
                        <View
                          style={[styles.radio, isSelected && styles.radioSelected]}
                        >
                          {isSelected ? <View style={styles.radioDot} /> : null}
                        </View>
                      </Pressable>
                    );
                  })}
                </View>
              )}
            </View>
          );
        })}
      </View>
    </ActionSheet>
  );
};

export default AppActionSheet;
