import { describe, expect, it } from 'vitest';
import {
  FORMAT_NUMBER_DEFAULTS,
  FORMAT_NUMBER_KIND,
  compareFormatNumber,
  formatNumber,
  formatNumberKeyed,
  formatNumberMany,
  formatNumberProduct,
  isFormatNumberValid,
  summarizeFormatNumber,
} from './format-number';
import { chunk, clampLength, hashString } from './format-number-helpers';

describe('util-format-number', () => {
  it('exposes its kind', () => {
    expect(FORMAT_NUMBER_KIND).toBe('format-number');
  });

  it('returns the fallback for empty input', () => {
    expect(formatNumber('')).toBe(FORMAT_NUMBER_DEFAULTS.fallback);
    expect(formatNumber('   ')).toBe(FORMAT_NUMBER_DEFAULTS.fallback);
    expect(formatNumber('', { fallback: 'n/a' })).toBe('n/a');
  });

  it('formats non-empty values into a bounded string', () => {
    const result = formatNumber('Wireless Headphones 42', { maxLength: 10 });
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
    expect(result.length).toBeLessThanOrEqual(10);
  });

  it('is deterministic', () => {
    expect(formatNumber('same input')).toBe(formatNumber('same input'));
    expect(compareFormatNumber('same', 'same')).toBe(0);
  });

  it('formats many values', () => {
    expect(formatNumberMany(['a', 2, 'c'])).toHaveLength(3);
  });

  it('validates input', () => {
    expect(isFormatNumberValid('value')).toBe(true);
    expect(isFormatNumberValid(12)).toBe(true);
    expect(isFormatNumberValid('')).toBe(false);
    expect(isFormatNumberValid(Number.NaN)).toBe(false);
    expect(isFormatNumberValid(null)).toBe(false);
  });

  it('formats a product', () => {
    const result = formatNumberProduct({
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
    const summary = summarizeFormatNumber(['alpha', 'be', 'gamma-ray']);
    expect(summary.count).toBe(3);
    expect(summary.longest.length).toBeGreaterThanOrEqual(
      summary.shortest.length,
    );
    expect(summary.checksum).toBeGreaterThanOrEqual(0);
  });

  it('groups records by a key', () => {
    const grouped = formatNumberKeyed(
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
