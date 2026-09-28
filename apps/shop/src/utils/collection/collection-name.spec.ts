import { describe, expect, it } from 'vitest';
import {
  COLLECTION_NAME_DEFAULTS,
  COLLECTION_NAME_KIND,
  compareCollectionName,
  collectionName,
  collectionNameKeyed,
  collectionNameMany,
  collectionNameProduct,
  isCollectionNameValid,
  summarizeCollectionName,
} from './collection-name';
import { chunk, clampLength, hashString } from './collection-name-helpers';

describe('util-collection-name', () => {
  it('exposes its kind', () => {
    expect(COLLECTION_NAME_KIND).toBe('collection-name');
  });

  it('returns the fallback for empty input', () => {
    expect(collectionName('')).toBe(COLLECTION_NAME_DEFAULTS.fallback);
    expect(collectionName('   ')).toBe(COLLECTION_NAME_DEFAULTS.fallback);
    expect(collectionName('', { fallback: 'n/a' })).toBe('n/a');
  });

  it('formats non-empty values into a bounded string', () => {
    const result = collectionName('Wireless Headphones 42', { maxLength: 10 });
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
    expect(result.length).toBeLessThanOrEqual(10);
  });

  it('is deterministic', () => {
    expect(collectionName('same input')).toBe(collectionName('same input'));
    expect(compareCollectionName('same', 'same')).toBe(0);
  });

  it('formats many values', () => {
    expect(collectionNameMany(['a', 2, 'c'])).toHaveLength(3);
  });

  it('validates input', () => {
    expect(isCollectionNameValid('value')).toBe(true);
    expect(isCollectionNameValid(12)).toBe(true);
    expect(isCollectionNameValid('')).toBe(false);
    expect(isCollectionNameValid(Number.NaN)).toBe(false);
    expect(isCollectionNameValid(null)).toBe(false);
  });

  it('formats a product', () => {
    const result = collectionNameProduct({
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
    const summary = summarizeCollectionName(['alpha', 'be', 'gamma-ray']);
    expect(summary.count).toBe(3);
    expect(summary.longest.length).toBeGreaterThanOrEqual(
      summary.shortest.length,
    );
    expect(summary.checksum).toBeGreaterThanOrEqual(0);
  });

  it('groups records by a key', () => {
    const grouped = collectionNameKeyed(
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
