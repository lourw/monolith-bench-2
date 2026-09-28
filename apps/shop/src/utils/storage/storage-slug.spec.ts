import { describe, expect, it } from 'vitest';
import {
  STORAGE_SLUG_DEFAULTS,
  STORAGE_SLUG_KIND,
  compareStorageSlug,
  storageSlug,
  storageSlugKeyed,
  storageSlugMany,
  storageSlugProduct,
  isStorageSlugValid,
  summarizeStorageSlug,
} from './storage-slug';
import { chunk, clampLength, hashString } from './storage-slug-helpers';

describe('util-storage-slug', () => {
  it('exposes its kind', () => {
    expect(STORAGE_SLUG_KIND).toBe('storage-slug');
  });

  it('returns the fallback for empty input', () => {
    expect(storageSlug('')).toBe(STORAGE_SLUG_DEFAULTS.fallback);
    expect(storageSlug('   ')).toBe(STORAGE_SLUG_DEFAULTS.fallback);
    expect(storageSlug('', { fallback: 'n/a' })).toBe('n/a');
  });

  it('formats non-empty values into a bounded string', () => {
    const result = storageSlug('Wireless Headphones 42', { maxLength: 10 });
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
    expect(result.length).toBeLessThanOrEqual(10);
  });

  it('is deterministic', () => {
    expect(storageSlug('same input')).toBe(storageSlug('same input'));
    expect(compareStorageSlug('same', 'same')).toBe(0);
  });

  it('formats many values', () => {
    expect(storageSlugMany(['a', 2, 'c'])).toHaveLength(3);
  });

  it('validates input', () => {
    expect(isStorageSlugValid('value')).toBe(true);
    expect(isStorageSlugValid(12)).toBe(true);
    expect(isStorageSlugValid('')).toBe(false);
    expect(isStorageSlugValid(Number.NaN)).toBe(false);
    expect(isStorageSlugValid(null)).toBe(false);
  });

  it('formats a product', () => {
    const result = storageSlugProduct({
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
    const summary = summarizeStorageSlug(['alpha', 'be', 'gamma-ray']);
    expect(summary.count).toBe(3);
    expect(summary.longest.length).toBeGreaterThanOrEqual(
      summary.shortest.length,
    );
    expect(summary.checksum).toBeGreaterThanOrEqual(0);
  });

  it('groups records by a key', () => {
    const grouped = storageSlugKeyed(
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
