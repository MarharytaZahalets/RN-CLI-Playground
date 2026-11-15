import React from 'react';

import {
  CalendarIcon,
  CanceledIcon,
  ChevronDownIcon,
  CirclePlusIcon,
  CloseIcon,
  DoneIcon,
  ExpandIcon,
  FilterIcon,
  InProcessIcon,
  LongArrowRightIcon,
  OngoingIcon,
  PlusIcon,
  SearchIcon,
} from '../../assets/icons/svg';
import { Colors } from '../theme/colors';

import type { TaskStatus } from '../../models/TaskList';
export type IconType =
  | 'arrow'
  | 'calendar'
  | 'chevronDown'
  | 'circlePlus'
  | 'close'
  | 'expand'
  | 'filter'
  | 'plus'
  | 'search';

export const TAB_ICON_SIZE: number = 22;

export const STATUS_ICON_SIZE: number = 16;

export const ICON_SIZE_20 = 20;
export const ICON_SIZE_28 = 28;
export const ICON_SIZE_50 = 50;

export const STATUS_ICONS: Record<TaskStatus, React.ReactNode> = {
  ongoing: (
    <OngoingIcon
      width={STATUS_ICON_SIZE}
      height={STATUS_ICON_SIZE}
      color={Colors.labelOngoing}
    />
  ),
  inProcess: (
    <InProcessIcon
      width={STATUS_ICON_SIZE}
      height={STATUS_ICON_SIZE}
      color={Colors.labelInProgress}
    />
  ),
  done: (
    <DoneIcon
      width={STATUS_ICON_SIZE}
      height={STATUS_ICON_SIZE}
      color={Colors.labelDone}
    />
  ),
  canceled: (
    <CanceledIcon
      width={STATUS_ICON_SIZE}
      height={STATUS_ICON_SIZE}
      color={Colors.labelCancel}
    />
  ),
};

export const APP_STATIC_ICONS: Record<IconType, React.ReactNode> = {
  arrow: (
    <LongArrowRightIcon
      width={ICON_SIZE_50}
      height={ICON_SIZE_50}
      color={Colors.accent}
    />
  ),
  calendar: (
    <CalendarIcon width={14} height={14} color={Colors.neutral} />
  ),
  chevronDown: (
    <ChevronDownIcon width={18} height={18} color={Colors.neutral} />
  ),
  circlePlus: (
    <CirclePlusIcon width={ICON_SIZE_28} height={ICON_SIZE_28} color={Colors.accent} />
  ),
  close: <CloseIcon width={ICON_SIZE_20} height={ICON_SIZE_20} color={Colors.accent} />,
  expand: <ExpandIcon width={18} height={18} color={Colors.neutral} />,
  filter: <FilterIcon width={ICON_SIZE_20} height={ICON_SIZE_20} color={Colors.accent} />,
  plus: <PlusIcon width={ICON_SIZE_20} height={ICON_SIZE_20} color={Colors.textLight} />,
  search: (
    <SearchIcon width={ICON_SIZE_20} height={ICON_SIZE_20} color={Colors.neutral} />
  ),
};
