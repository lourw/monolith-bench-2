import { describe, expect, it } from 'vitest';
import {
  I18N_NUMBER_DEFAULTS,
  I18N_NUMBER_KIND,
  compareI18nNumber,
  i18nNumber,
  i18nNumberKeyed,
  i18nNumberMany,
  i18nNumberProduct,
  isI18nNumberValid,
  summarizeI18nNumber,
} from './i18n-number';
import { chunk, clampLength, hashString } from './i18n-number-helpers';

describe('util-i18n-number', () => {
  it('exposes its kind', () => {
    expect(I18N_NUMBER_KIND).toBe('i18n-number');
  });

  it('returns the fallback for empty input', () => {
    expect(i18nNumber('')).toBe(I18N_NUMBER_DEFAULTS.fallback);
    expect(i18nNumber('   ')).toBe(I18N_NUMBER_DEFAULTS.fallback);
    expect(i18nNumber('', { fallback: 'n/a' })).toBe('n/a');
  });

  it('formats non-empty values into a bounded string', () => {
    const result = i18nNumber('Wireless Headphones 42', { maxLength: 10 });
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
    expect(result.length).toBeLessThanOrEqual(10);
  });

  it('is deterministic', () => {
    expect(i18nNumber('same input')).toBe(i18nNumber('same input'));
    expect(compareI18nNumber('same', 'same')).toBe(0);
  });

  it('formats many values', () => {
    expect(i18nNumberMany(['a', 2, 'c'])).toHaveLength(3);
  });

  it('validates input', () => {
    expect(isI18nNumberValid('value')).toBe(true);
    expect(isI18nNumberValid(12)).toBe(true);
    expect(isI18nNumberValid('')).toBe(false);
    expect(isI18nNumberValid(Number.NaN)).toBe(false);
    expect(isI18nNumberValid(null)).toBe(false);
  });

  it('formats a product', () => {
    const result = i18nNumberProduct({
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
    const summary = summarizeI18nNumber(['alpha', 'be', 'gamma-ray']);
    expect(summary.count).toBe(3);
    expect(summary.longest.length).toBeGreaterThanOrEqual(
      summary.shortest.length,
    );
    expect(summary.checksum).toBeGreaterThanOrEqual(0);
  });

  it('groups records by a key', () => {
    const grouped = i18nNumberKeyed(
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
