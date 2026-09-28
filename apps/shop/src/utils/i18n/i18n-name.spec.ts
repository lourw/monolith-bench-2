import { describe, expect, it } from 'vitest';
import {
  I18N_NAME_DEFAULTS,
  I18N_NAME_KIND,
  compareI18nName,
  i18nName,
  i18nNameKeyed,
  i18nNameMany,
  i18nNameProduct,
  isI18nNameValid,
  summarizeI18nName,
} from './i18n-name';
import { chunk, clampLength, hashString } from './i18n-name-helpers';

describe('util-i18n-name', () => {
  it('exposes its kind', () => {
    expect(I18N_NAME_KIND).toBe('i18n-name');
  });

  it('returns the fallback for empty input', () => {
    expect(i18nName('')).toBe(I18N_NAME_DEFAULTS.fallback);
    expect(i18nName('   ')).toBe(I18N_NAME_DEFAULTS.fallback);
    expect(i18nName('', { fallback: 'n/a' })).toBe('n/a');
  });

  it('formats non-empty values into a bounded string', () => {
    const result = i18nName('Wireless Headphones 42', { maxLength: 10 });
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
    expect(result.length).toBeLessThanOrEqual(10);
  });

  it('is deterministic', () => {
    expect(i18nName('same input')).toBe(i18nName('same input'));
    expect(compareI18nName('same', 'same')).toBe(0);
  });

  it('formats many values', () => {
    expect(i18nNameMany(['a', 2, 'c'])).toHaveLength(3);
  });

  it('validates input', () => {
    expect(isI18nNameValid('value')).toBe(true);
    expect(isI18nNameValid(12)).toBe(true);
    expect(isI18nNameValid('')).toBe(false);
    expect(isI18nNameValid(Number.NaN)).toBe(false);
    expect(isI18nNameValid(null)).toBe(false);
  });

  it('formats a product', () => {
    const result = i18nNameProduct({
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
    const summary = summarizeI18nName(['alpha', 'be', 'gamma-ray']);
    expect(summary.count).toBe(3);
    expect(summary.longest.length).toBeGreaterThanOrEqual(
      summary.shortest.length,
    );
    expect(summary.checksum).toBeGreaterThanOrEqual(0);
  });

  it('groups records by a key', () => {
    const grouped = i18nNameKeyed(
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
