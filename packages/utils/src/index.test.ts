import { describe, it, expect } from 'vitest';
import { formatDate } from './index';

describe('formatDate', () => {
  it('should format date correctly', () => {
    const date = new Date('2023-06-15T12:00:00Z');
    expect(formatDate(date)).toBe('2023-06-15');
  });

  it('should handle different timezones', () => {
    const date = new Date('2023-06-15T23:59:59Z');
    expect(formatDate(date)).toBe('2023-06-15');
  });
});