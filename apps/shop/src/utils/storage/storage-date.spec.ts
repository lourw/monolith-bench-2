import { describe, expect, it } from 'vitest';
import {
  STORAGE_DATE_DEFAULTS,
  STORAGE_DATE_KIND,
  compareStorageDate,
  storageDate,
  storageDateKeyed,
  storageDateMany,
  storageDateProduct,
  isStorageDateValid,
  summarizeStorageDate,
} from './storage-date';
import { chunk, clampLength, hashString } from './storage-date-helpers';

describe('util-storage-date', () => {
  it('exposes its kind', () => {
    expect(STORAGE_DATE_KIND).toBe('storage-date');
  });

  it('returns the fallback for empty input', () => {
    expect(storageDate('')).toBe(STORAGE_DATE_DEFAULTS.fallback);
    expect(storageDate('   ')).toBe(STORAGE_DATE_DEFAULTS.fallback);
    expect(storageDate('', { fallback: 'n/a' })).toBe('n/a');
  });

  it('formats non-empty values into a bounded string', () => {
    const result = storageDate('Wireless Headphones 42', { maxLength: 10 });
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
    expect(result.length).toBeLessThanOrEqual(10);
  });

  it('is deterministic', () => {
    expect(storageDate('same input')).toBe(storageDate('same input'));
    expect(compareStorageDate('same', 'same')).toBe(0);
  });

  it('formats many values', () => {
    expect(storageDateMany(['a', 2, 'c'])).toHaveLength(3);
  });

  it('validates input', () => {
    expect(isStorageDateValid('value')).toBe(true);
    expect(isStorageDateValid(12)).toBe(true);
    expect(isStorageDateValid('')).toBe(false);
    expect(isStorageDateValid(Number.NaN)).toBe(false);
    expect(isStorageDateValid(null)).toBe(false);
  });

  it('formats a product', () => {
    const result = storageDateProduct({
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
    const summary = summarizeStorageDate(['alpha', 'be', 'gamma-ray']);
    expect(summary.count).toBe(3);
    expect(summary.longest.length).toBeGreaterThanOrEqual(
      summary.shortest.length,
    );
    expect(summary.checksum).toBeGreaterThanOrEqual(0);
  });

  it('groups records by a key', () => {
    const grouped = storageDateKeyed(
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
