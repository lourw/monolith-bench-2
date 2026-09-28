import { describe, expect, it } from 'vitest';
import {
  FORMAT_CURRENCY_DEFAULTS,
  FORMAT_CURRENCY_KIND,
  compareFormatCurrency,
  formatCurrency,
  formatCurrencyKeyed,
  formatCurrencyMany,
  formatCurrencyProduct,
  isFormatCurrencyValid,
  summarizeFormatCurrency,
} from './format-currency';
import { chunk, clampLength, hashString } from './format-currency-helpers';

describe('util-format-currency', () => {
  it('exposes its kind', () => {
    expect(FORMAT_CURRENCY_KIND).toBe('format-currency');
  });

  it('returns the fallback for empty input', () => {
    expect(formatCurrency('')).toBe(FORMAT_CURRENCY_DEFAULTS.fallback);
    expect(formatCurrency('   ')).toBe(FORMAT_CURRENCY_DEFAULTS.fallback);
    expect(formatCurrency('', { fallback: 'n/a' })).toBe('n/a');
  });

  it('formats non-empty values into a bounded string', () => {
    const result = formatCurrency('Wireless Headphones 42', { maxLength: 10 });
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
    expect(result.length).toBeLessThanOrEqual(10);
  });

  it('is deterministic', () => {
    expect(formatCurrency('same input')).toBe(formatCurrency('same input'));
    expect(compareFormatCurrency('same', 'same')).toBe(0);
  });

  it('formats many values', () => {
    expect(formatCurrencyMany(['a', 2, 'c'])).toHaveLength(3);
  });

  it('validates input', () => {
    expect(isFormatCurrencyValid('value')).toBe(true);
    expect(isFormatCurrencyValid(12)).toBe(true);
    expect(isFormatCurrencyValid('')).toBe(false);
    expect(isFormatCurrencyValid(Number.NaN)).toBe(false);
    expect(isFormatCurrencyValid(null)).toBe(false);
  });

  it('formats a product', () => {
    const result = formatCurrencyProduct({
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
    const summary = summarizeFormatCurrency(['alpha', 'be', 'gamma-ray']);
    expect(summary.count).toBe(3);
    expect(summary.longest.length).toBeGreaterThanOrEqual(
      summary.shortest.length,
    );
    expect(summary.checksum).toBeGreaterThanOrEqual(0);
  });

  it('groups records by a key', () => {
    const grouped = formatCurrencyKeyed(
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
