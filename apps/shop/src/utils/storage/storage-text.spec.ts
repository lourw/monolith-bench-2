import { describe, expect, it } from 'vitest';
import {
  STORAGE_TEXT_DEFAULTS,
  STORAGE_TEXT_KIND,
  compareStorageText,
  storageText,
  storageTextKeyed,
  storageTextMany,
  storageTextProduct,
  isStorageTextValid,
  summarizeStorageText,
} from './storage-text';
import { chunk, clampLength, hashString } from './storage-text-helpers';

describe('util-storage-text', () => {
  it('exposes its kind', () => {
    expect(STORAGE_TEXT_KIND).toBe('storage-text');
  });

  it('returns the fallback for empty input', () => {
    expect(storageText('')).toBe(STORAGE_TEXT_DEFAULTS.fallback);
    expect(storageText('   ')).toBe(STORAGE_TEXT_DEFAULTS.fallback);
    expect(storageText('', { fallback: 'n/a' })).toBe('n/a');
  });

  it('formats non-empty values into a bounded string', () => {
    const result = storageText('Wireless Headphones 42', { maxLength: 10 });
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
    expect(result.length).toBeLessThanOrEqual(10);
  });

  it('is deterministic', () => {
    expect(storageText('same input')).toBe(storageText('same input'));
    expect(compareStorageText('same', 'same')).toBe(0);
  });

  it('formats many values', () => {
    expect(storageTextMany(['a', 2, 'c'])).toHaveLength(3);
  });

  it('validates input', () => {
    expect(isStorageTextValid('value')).toBe(true);
    expect(isStorageTextValid(12)).toBe(true);
    expect(isStorageTextValid('')).toBe(false);
    expect(isStorageTextValid(Number.NaN)).toBe(false);
    expect(isStorageTextValid(null)).toBe(false);
  });

  it('formats a product', () => {
    const result = storageTextProduct({
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
    const summary = summarizeStorageText(['alpha', 'be', 'gamma-ray']);
    expect(summary.count).toBe(3);
    expect(summary.longest.length).toBeGreaterThanOrEqual(
      summary.shortest.length,
    );
    expect(summary.checksum).toBeGreaterThanOrEqual(0);
  });

  it('groups records by a key', () => {
    const grouped = storageTextKeyed(
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
