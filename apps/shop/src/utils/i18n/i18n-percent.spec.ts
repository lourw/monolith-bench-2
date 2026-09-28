import { describe, expect, it } from 'vitest';
import {
  I18N_PERCENT_DEFAULTS,
  I18N_PERCENT_KIND,
  compareI18nPercent,
  i18nPercent,
  i18nPercentKeyed,
  i18nPercentMany,
  i18nPercentProduct,
  isI18nPercentValid,
  summarizeI18nPercent,
} from './i18n-percent';
import { chunk, clampLength, hashString } from './i18n-percent-helpers';

describe('util-i18n-percent', () => {
  it('exposes its kind', () => {
    expect(I18N_PERCENT_KIND).toBe('i18n-percent');
  });

  it('returns the fallback for empty input', () => {
    expect(i18nPercent('')).toBe(I18N_PERCENT_DEFAULTS.fallback);
    expect(i18nPercent('   ')).toBe(I18N_PERCENT_DEFAULTS.fallback);
    expect(i18nPercent('', { fallback: 'n/a' })).toBe('n/a');
  });

  it('formats non-empty values into a bounded string', () => {
    const result = i18nPercent('Wireless Headphones 42', { maxLength: 10 });
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
    expect(result.length).toBeLessThanOrEqual(10);
  });

  it('is deterministic', () => {
    expect(i18nPercent('same input')).toBe(i18nPercent('same input'));
    expect(compareI18nPercent('same', 'same')).toBe(0);
  });

  it('formats many values', () => {
    expect(i18nPercentMany(['a', 2, 'c'])).toHaveLength(3);
  });

  it('validates input', () => {
    expect(isI18nPercentValid('value')).toBe(true);
    expect(isI18nPercentValid(12)).toBe(true);
    expect(isI18nPercentValid('')).toBe(false);
    expect(isI18nPercentValid(Number.NaN)).toBe(false);
    expect(isI18nPercentValid(null)).toBe(false);
  });

  it('formats a product', () => {
    const result = i18nPercentProduct({
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
    const summary = summarizeI18nPercent(['alpha', 'be', 'gamma-ray']);
    expect(summary.count).toBe(3);
    expect(summary.longest.length).toBeGreaterThanOrEqual(
      summary.shortest.length,
    );
    expect(summary.checksum).toBeGreaterThanOrEqual(0);
  });

  it('groups records by a key', () => {
    const grouped = i18nPercentKeyed(
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
