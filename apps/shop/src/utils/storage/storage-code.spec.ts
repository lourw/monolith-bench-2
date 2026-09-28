import { describe, expect, it } from 'vitest';
import {
  STORAGE_CODE_DEFAULTS,
  STORAGE_CODE_KIND,
  compareStorageCode,
  storageCode,
  storageCodeKeyed,
  storageCodeMany,
  storageCodeProduct,
  isStorageCodeValid,
  summarizeStorageCode,
} from './storage-code';
import { chunk, clampLength, hashString } from './storage-code-helpers';

describe('util-storage-code', () => {
  it('exposes its kind', () => {
    expect(STORAGE_CODE_KIND).toBe('storage-code');
  });

  it('returns the fallback for empty input', () => {
    expect(storageCode('')).toBe(STORAGE_CODE_DEFAULTS.fallback);
    expect(storageCode('   ')).toBe(STORAGE_CODE_DEFAULTS.fallback);
    expect(storageCode('', { fallback: 'n/a' })).toBe('n/a');
  });

  it('formats non-empty values into a bounded string', () => {
    const result = storageCode('Wireless Headphones 42', { maxLength: 10 });
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
    expect(result.length).toBeLessThanOrEqual(10);
  });

  it('is deterministic', () => {
    expect(storageCode('same input')).toBe(storageCode('same input'));
    expect(compareStorageCode('same', 'same')).toBe(0);
  });

  it('formats many values', () => {
    expect(storageCodeMany(['a', 2, 'c'])).toHaveLength(3);
  });

  it('validates input', () => {
    expect(isStorageCodeValid('value')).toBe(true);
    expect(isStorageCodeValid(12)).toBe(true);
    expect(isStorageCodeValid('')).toBe(false);
    expect(isStorageCodeValid(Number.NaN)).toBe(false);
    expect(isStorageCodeValid(null)).toBe(false);
  });

  it('formats a product', () => {
    const result = storageCodeProduct({
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
    const summary = summarizeStorageCode(['alpha', 'be', 'gamma-ray']);
    expect(summary.count).toBe(3);
    expect(summary.longest.length).toBeGreaterThanOrEqual(
      summary.shortest.length,
    );
    expect(summary.checksum).toBeGreaterThanOrEqual(0);
  });

  it('groups records by a key', () => {
    const grouped = storageCodeKeyed(
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
