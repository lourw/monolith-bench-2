import { describe, expect, it } from 'vitest';
import {
  STORAGE_NAME_DEFAULTS,
  STORAGE_NAME_KIND,
  compareStorageName,
  storageName,
  storageNameKeyed,
  storageNameMany,
  storageNameProduct,
  isStorageNameValid,
  summarizeStorageName,
} from './storage-name';
import { chunk, clampLength, hashString } from './storage-name-helpers';

describe('util-storage-name', () => {
  it('exposes its kind', () => {
    expect(STORAGE_NAME_KIND).toBe('storage-name');
  });

  it('returns the fallback for empty input', () => {
    expect(storageName('')).toBe(STORAGE_NAME_DEFAULTS.fallback);
    expect(storageName('   ')).toBe(STORAGE_NAME_DEFAULTS.fallback);
    expect(storageName('', { fallback: 'n/a' })).toBe('n/a');
  });

  it('formats non-empty values into a bounded string', () => {
    const result = storageName('Wireless Headphones 42', { maxLength: 10 });
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
    expect(result.length).toBeLessThanOrEqual(10);
  });

  it('is deterministic', () => {
    expect(storageName('same input')).toBe(storageName('same input'));
    expect(compareStorageName('same', 'same')).toBe(0);
  });

  it('formats many values', () => {
    expect(storageNameMany(['a', 2, 'c'])).toHaveLength(3);
  });

  it('validates input', () => {
    expect(isStorageNameValid('value')).toBe(true);
    expect(isStorageNameValid(12)).toBe(true);
    expect(isStorageNameValid('')).toBe(false);
    expect(isStorageNameValid(Number.NaN)).toBe(false);
    expect(isStorageNameValid(null)).toBe(false);
  });

  it('formats a product', () => {
    const result = storageNameProduct({
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
    const summary = summarizeStorageName(['alpha', 'be', 'gamma-ray']);
    expect(summary.count).toBe(3);
    expect(summary.longest.length).toBeGreaterThanOrEqual(
      summary.shortest.length,
    );
    expect(summary.checksum).toBeGreaterThanOrEqual(0);
  });

  it('groups records by a key', () => {
    const grouped = storageNameKeyed(
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
