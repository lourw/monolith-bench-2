import { describe, expect, it } from 'vitest';
import {
  I18N_TEXT_DEFAULTS,
  I18N_TEXT_KIND,
  compareI18nText,
  i18nText,
  i18nTextKeyed,
  i18nTextMany,
  i18nTextProduct,
  isI18nTextValid,
  summarizeI18nText,
} from './i18n-text';
import { chunk, clampLength, hashString } from './i18n-text-helpers';

describe('util-i18n-text', () => {
  it('exposes its kind', () => {
    expect(I18N_TEXT_KIND).toBe('i18n-text');
  });

  it('returns the fallback for empty input', () => {
    expect(i18nText('')).toBe(I18N_TEXT_DEFAULTS.fallback);
    expect(i18nText('   ')).toBe(I18N_TEXT_DEFAULTS.fallback);
    expect(i18nText('', { fallback: 'n/a' })).toBe('n/a');
  });

  it('formats non-empty values into a bounded string', () => {
    const result = i18nText('Wireless Headphones 42', { maxLength: 10 });
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
    expect(result.length).toBeLessThanOrEqual(10);
  });

  it('is deterministic', () => {
    expect(i18nText('same input')).toBe(i18nText('same input'));
    expect(compareI18nText('same', 'same')).toBe(0);
  });

  it('formats many values', () => {
    expect(i18nTextMany(['a', 2, 'c'])).toHaveLength(3);
  });

  it('validates input', () => {
    expect(isI18nTextValid('value')).toBe(true);
    expect(isI18nTextValid(12)).toBe(true);
    expect(isI18nTextValid('')).toBe(false);
    expect(isI18nTextValid(Number.NaN)).toBe(false);
    expect(isI18nTextValid(null)).toBe(false);
  });

  it('formats a product', () => {
    const result = i18nTextProduct({
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
    const summary = summarizeI18nText(['alpha', 'be', 'gamma-ray']);
    expect(summary.count).toBe(3);
    expect(summary.longest.length).toBeGreaterThanOrEqual(
      summary.shortest.length,
    );
    expect(summary.checksum).toBeGreaterThanOrEqual(0);
  });

  it('groups records by a key', () => {
    const grouped = i18nTextKeyed(
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
