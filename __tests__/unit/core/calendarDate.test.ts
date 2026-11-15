import {
  formatCalendarDate,
  parseCalendarDate,
  toCalendarDate,
} from '../../../src/core/utils/utils';

describe('calendar dates', () => {
  it('stores local calendar days without timezone shifting', () => {
    const local = new Date(2026, 2, 31);
    expect(toCalendarDate(local)).toBe('2026-03-31');

    const parsed = parseCalendarDate('2026-03-31');
    expect(parsed?.getFullYear()).toBe(2026);
    expect(parsed?.getMonth()).toBe(2);
    expect(parsed?.getDate()).toBe(31);
    expect(parseCalendarDate('not-a-date')).toBeNull();
    expect(formatCalendarDate('2026-03-31')).toBe('31/03/2026');
  });
});
