import { describe, expect, it } from 'vitest';
import {
  I18N_CURRENCY_DEFAULTS,
  I18N_CURRENCY_KIND,
  compareI18nCurrency,
  i18nCurrency,
  i18nCurrencyKeyed,
  i18nCurrencyMany,
  i18nCurrencyProduct,
  isI18nCurrencyValid,
  summarizeI18nCurrency,
} from './i18n-currency';
import { chunk, clampLength, hashString } from './i18n-currency-helpers';

describe('util-i18n-currency', () => {
  it('exposes its kind', () => {
    expect(I18N_CURRENCY_KIND).toBe('i18n-currency');
  });

  it('returns the fallback for empty input', () => {
    expect(i18nCurrency('')).toBe(I18N_CURRENCY_DEFAULTS.fallback);
    expect(i18nCurrency('   ')).toBe(I18N_CURRENCY_DEFAULTS.fallback);
    expect(i18nCurrency('', { fallback: 'n/a' })).toBe('n/a');
  });

  it('formats non-empty values into a bounded string', () => {
    const result = i18nCurrency('Wireless Headphones 42', { maxLength: 10 });
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
    expect(result.length).toBeLessThanOrEqual(10);
  });

  it('is deterministic', () => {
    expect(i18nCurrency('same input')).toBe(i18nCurrency('same input'));
    expect(compareI18nCurrency('same', 'same')).toBe(0);
  });

  it('formats many values', () => {
    expect(i18nCurrencyMany(['a', 2, 'c'])).toHaveLength(3);
  });

  it('validates input', () => {
    expect(isI18nCurrencyValid('value')).toBe(true);
    expect(isI18nCurrencyValid(12)).toBe(true);
    expect(isI18nCurrencyValid('')).toBe(false);
    expect(isI18nCurrencyValid(Number.NaN)).toBe(false);
    expect(isI18nCurrencyValid(null)).toBe(false);
  });

  it('formats a product', () => {
    const result = i18nCurrencyProduct({
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
    const summary = summarizeI18nCurrency(['alpha', 'be', 'gamma-ray']);
    expect(summary.count).toBe(3);
    expect(summary.longest.length).toBeGreaterThanOrEqual(
      summary.shortest.length,
    );
    expect(summary.checksum).toBeGreaterThanOrEqual(0);
  });

  it('groups records by a key', () => {
    const grouped = i18nCurrencyKeyed(
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
