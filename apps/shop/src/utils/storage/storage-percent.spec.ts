import { describe, expect, it } from 'vitest';
import {
  STORAGE_PERCENT_DEFAULTS,
  STORAGE_PERCENT_KIND,
  compareStoragePercent,
  storagePercent,
  storagePercentKeyed,
  storagePercentMany,
  storagePercentProduct,
  isStoragePercentValid,
  summarizeStoragePercent,
} from './storage-percent';
import { chunk, clampLength, hashString } from './storage-percent-helpers';

describe('util-storage-percent', () => {
  it('exposes its kind', () => {
    expect(STORAGE_PERCENT_KIND).toBe('storage-percent');
  });

  it('returns the fallback for empty input', () => {
    expect(storagePercent('')).toBe(STORAGE_PERCENT_DEFAULTS.fallback);
    expect(storagePercent('   ')).toBe(STORAGE_PERCENT_DEFAULTS.fallback);
    expect(storagePercent('', { fallback: 'n/a' })).toBe('n/a');
  });

  it('formats non-empty values into a bounded string', () => {
    const result = storagePercent('Wireless Headphones 42', { maxLength: 10 });
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
    expect(result.length).toBeLessThanOrEqual(10);
  });

  it('is deterministic', () => {
    expect(storagePercent('same input')).toBe(storagePercent('same input'));
    expect(compareStoragePercent('same', 'same')).toBe(0);
  });

  it('formats many values', () => {
    expect(storagePercentMany(['a', 2, 'c'])).toHaveLength(3);
  });

  it('validates input', () => {
    expect(isStoragePercentValid('value')).toBe(true);
    expect(isStoragePercentValid(12)).toBe(true);
    expect(isStoragePercentValid('')).toBe(false);
    expect(isStoragePercentValid(Number.NaN)).toBe(false);
    expect(isStoragePercentValid(null)).toBe(false);
  });

  it('formats a product', () => {
    const result = storagePercentProduct({
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
    const summary = summarizeStoragePercent(['alpha', 'be', 'gamma-ray']);
    expect(summary.count).toBe(3);
    expect(summary.longest.length).toBeGreaterThanOrEqual(
      summary.shortest.length,
    );
    expect(summary.checksum).toBeGreaterThanOrEqual(0);
  });

  it('groups records by a key', () => {
    const grouped = storagePercentKeyed(
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
