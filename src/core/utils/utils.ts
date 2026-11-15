import { Linking, Platform } from 'react-native';

export const generateId = () => `${Date.now()}-${Math.floor(Math.random() * 1000)}`;

export const hasChanges = <T extends object>(
  original: T,
  updated: T,
  keys: (keyof T)[],
): boolean => {
  return keys.some((key) => original[key] !== updated[key]);
};

export const errorHandler = (err: unknown) => {
  if (err instanceof Error) {
    return err.message;
  } else {
    return 'An unknown error occurred';
  }
};

export const dateString = (date: Date) => new Date(date).toLocaleDateString();

const CALENDAR_DATE = /^(\d{4})-(\d{2})-(\d{2})$/;

export const toCalendarDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const parseCalendarDate = (value: string): Date | null => {
  const match = CALENDAR_DATE.exec(value);
  if (!match) {
    return null;
  }

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const date = new Date(year, month - 1, day);

  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null;
  }

  return date;
};

export const formatCalendarDate = (value: string): string => {
  const date = parseCalendarDate(value);
  if (!date) {
    return value;
  }

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  return `${day}/${month}/${date.getFullYear()}`;
};

export const openAppSettings = () => {
  Linking.openSettings();
};

export const isAndroid = () => Platform.OS === 'android';
