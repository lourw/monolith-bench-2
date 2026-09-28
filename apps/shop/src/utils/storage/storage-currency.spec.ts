import { describe, expect, it } from 'vitest';
import {
  STORAGE_CURRENCY_DEFAULTS,
  STORAGE_CURRENCY_KIND,
  compareStorageCurrency,
  storageCurrency,
  storageCurrencyKeyed,
  storageCurrencyMany,
  storageCurrencyProduct,
  isStorageCurrencyValid,
  summarizeStorageCurrency,
} from './storage-currency';
import { chunk, clampLength, hashString } from './storage-currency-helpers';

describe('util-storage-currency', () => {
  it('exposes its kind', () => {
    expect(STORAGE_CURRENCY_KIND).toBe('storage-currency');
  });

  it('returns the fallback for empty input', () => {
    expect(storageCurrency('')).toBe(STORAGE_CURRENCY_DEFAULTS.fallback);
    expect(storageCurrency('   ')).toBe(STORAGE_CURRENCY_DEFAULTS.fallback);
    expect(storageCurrency('', { fallback: 'n/a' })).toBe('n/a');
  });

  it('formats non-empty values into a bounded string', () => {
    const result = storageCurrency('Wireless Headphones 42', { maxLength: 10 });
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
    expect(result.length).toBeLessThanOrEqual(10);
  });

  it('is deterministic', () => {
    expect(storageCurrency('same input')).toBe(storageCurrency('same input'));
    expect(compareStorageCurrency('same', 'same')).toBe(0);
  });

  it('formats many values', () => {
    expect(storageCurrencyMany(['a', 2, 'c'])).toHaveLength(3);
  });

  it('validates input', () => {
    expect(isStorageCurrencyValid('value')).toBe(true);
    expect(isStorageCurrencyValid(12)).toBe(true);
    expect(isStorageCurrencyValid('')).toBe(false);
    expect(isStorageCurrencyValid(Number.NaN)).toBe(false);
    expect(isStorageCurrencyValid(null)).toBe(false);
  });

  it('formats a product', () => {
    const result = storageCurrencyProduct({
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
    const summary = summarizeStorageCurrency(['alpha', 'be', 'gamma-ray']);
    expect(summary.count).toBe(3);
    expect(summary.longest.length).toBeGreaterThanOrEqual(
      summary.shortest.length,
    );
    expect(summary.checksum).toBeGreaterThanOrEqual(0);
  });

  it('groups records by a key', () => {
    const grouped = storageCurrencyKeyed(
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
