import { describe, expect, it } from 'vitest';
import {
  FORMAT_DATE_DEFAULTS,
  FORMAT_DATE_KIND,
  compareFormatDate,
  formatDate,
  formatDateKeyed,
  formatDateMany,
  formatDateProduct,
  isFormatDateValid,
  summarizeFormatDate,
} from './format-date';
import { chunk, clampLength, hashString } from './format-date-helpers';

describe('util-format-date', () => {
  it('exposes its kind', () => {
    expect(FORMAT_DATE_KIND).toBe('format-date');
  });

  it('returns the fallback for empty input', () => {
    expect(formatDate('')).toBe(FORMAT_DATE_DEFAULTS.fallback);
    expect(formatDate('   ')).toBe(FORMAT_DATE_DEFAULTS.fallback);
    expect(formatDate('', { fallback: 'n/a' })).toBe('n/a');
  });

  it('formats non-empty values into a bounded string', () => {
    const result = formatDate('Wireless Headphones 42', { maxLength: 10 });
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
    expect(result.length).toBeLessThanOrEqual(10);
  });

  it('is deterministic', () => {
    expect(formatDate('same input')).toBe(formatDate('same input'));
    expect(compareFormatDate('same', 'same')).toBe(0);
  });

  it('formats many values', () => {
    expect(formatDateMany(['a', 2, 'c'])).toHaveLength(3);
  });

  it('validates input', () => {
    expect(isFormatDateValid('value')).toBe(true);
    expect(isFormatDateValid(12)).toBe(true);
    expect(isFormatDateValid('')).toBe(false);
    expect(isFormatDateValid(Number.NaN)).toBe(false);
    expect(isFormatDateValid(null)).toBe(false);
  });

  it('formats a product', () => {
    const result = formatDateProduct({
      id: '1',
      name: 'Desk Lamp',
      description: 'A lamp',
      price: 19.99,
      category: 'Home',
      imageUrl: '',
      inStock: true,
      rating: 4,
      reviewCount: 2,
    });
    expect(result.length).toBeGreaterThan(0);
  });

  it('summarizes values', () => {
    const summary = summarizeFormatDate(['alpha', 'be', 'gamma-ray']);
    expect(summary.count).toBe(3);
    expect(summary.longest.length).toBeGreaterThanOrEqual(
      summary.shortest.length,
    );
    expect(summary.checksum).toBeGreaterThanOrEqual(0);
  });

  it('groups records by a key', () => {
    const grouped = formatDateKeyed(
      [
        { id: 'a', status: 'open' },
        { id: 'b', status: 'open' },
        { id: 'c', status: 'closed' },
      ],
      'status',
    );
    expect(grouped.size).toBe(2);
  });

  it('helpers behave', () => {
    expect(clampLength('abcdef', 3)).toHaveLength(3);
    expect(hashString('x')).toBe(hashString('x'));
    expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
  });
});
