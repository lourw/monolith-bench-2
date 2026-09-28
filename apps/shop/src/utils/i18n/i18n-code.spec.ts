import { describe, expect, it } from 'vitest';
import {
  I18N_CODE_DEFAULTS,
  I18N_CODE_KIND,
  compareI18nCode,
  i18nCode,
  i18nCodeKeyed,
  i18nCodeMany,
  i18nCodeProduct,
  isI18nCodeValid,
  summarizeI18nCode,
} from './i18n-code';
import { chunk, clampLength, hashString } from './i18n-code-helpers';

describe('util-i18n-code', () => {
  it('exposes its kind', () => {
    expect(I18N_CODE_KIND).toBe('i18n-code');
  });

  it('returns the fallback for empty input', () => {
    expect(i18nCode('')).toBe(I18N_CODE_DEFAULTS.fallback);
    expect(i18nCode('   ')).toBe(I18N_CODE_DEFAULTS.fallback);
    expect(i18nCode('', { fallback: 'n/a' })).toBe('n/a');
  });

  it('formats non-empty values into a bounded string', () => {
    const result = i18nCode('Wireless Headphones 42', { maxLength: 10 });
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
    expect(result.length).toBeLessThanOrEqual(10);
  });

  it('is deterministic', () => {
    expect(i18nCode('same input')).toBe(i18nCode('same input'));
    expect(compareI18nCode('same', 'same')).toBe(0);
  });

  it('formats many values', () => {
    expect(i18nCodeMany(['a', 2, 'c'])).toHaveLength(3);
  });

  it('validates input', () => {
    expect(isI18nCodeValid('value')).toBe(true);
    expect(isI18nCodeValid(12)).toBe(true);
    expect(isI18nCodeValid('')).toBe(false);
    expect(isI18nCodeValid(Number.NaN)).toBe(false);
    expect(isI18nCodeValid(null)).toBe(false);
  });

  it('formats a product', () => {
    const result = i18nCodeProduct({
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
    const summary = summarizeI18nCode(['alpha', 'be', 'gamma-ray']);
    expect(summary.count).toBe(3);
    expect(summary.longest.length).toBeGreaterThanOrEqual(
      summary.shortest.length,
    );
    expect(summary.checksum).toBeGreaterThanOrEqual(0);
  });

  it('groups records by a key', () => {
    const grouped = i18nCodeKeyed(
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
