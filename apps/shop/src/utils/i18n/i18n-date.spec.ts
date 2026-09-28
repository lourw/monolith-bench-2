import { describe, expect, it } from 'vitest';
import {
  I18N_DATE_DEFAULTS,
  I18N_DATE_KIND,
  compareI18nDate,
  i18nDate,
  i18nDateKeyed,
  i18nDateMany,
  i18nDateProduct,
  isI18nDateValid,
  summarizeI18nDate,
} from './i18n-date';
import { chunk, clampLength, hashString } from './i18n-date-helpers';

describe('util-i18n-date', () => {
  it('exposes its kind', () => {
    expect(I18N_DATE_KIND).toBe('i18n-date');
  });

  it('returns the fallback for empty input', () => {
    expect(i18nDate('')).toBe(I18N_DATE_DEFAULTS.fallback);
    expect(i18nDate('   ')).toBe(I18N_DATE_DEFAULTS.fallback);
    expect(i18nDate('', { fallback: 'n/a' })).toBe('n/a');
  });

  it('formats non-empty values into a bounded string', () => {
    const result = i18nDate('Wireless Headphones 42', { maxLength: 10 });
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
    expect(result.length).toBeLessThanOrEqual(10);
  });

  it('is deterministic', () => {
    expect(i18nDate('same input')).toBe(i18nDate('same input'));
    expect(compareI18nDate('same', 'same')).toBe(0);
  });

  it('formats many values', () => {
    expect(i18nDateMany(['a', 2, 'c'])).toHaveLength(3);
  });

  it('validates input', () => {
    expect(isI18nDateValid('value')).toBe(true);
    expect(isI18nDateValid(12)).toBe(true);
    expect(isI18nDateValid('')).toBe(false);
    expect(isI18nDateValid(Number.NaN)).toBe(false);
    expect(isI18nDateValid(null)).toBe(false);
  });

  it('formats a product', () => {
    const result = i18nDateProduct({
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
    const summary = summarizeI18nDate(['alpha', 'be', 'gamma-ray']);
    expect(summary.count).toBe(3);
    expect(summary.longest.length).toBeGreaterThanOrEqual(
      summary.shortest.length,
    );
    expect(summary.checksum).toBeGreaterThanOrEqual(0);
  });

  it('groups records by a key', () => {
    const grouped = i18nDateKeyed(
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
