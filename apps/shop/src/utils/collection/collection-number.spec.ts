import { describe, expect, it } from 'vitest';
import {
  COLLECTION_NUMBER_DEFAULTS,
  COLLECTION_NUMBER_KIND,
  compareCollectionNumber,
  collectionNumber,
  collectionNumberKeyed,
  collectionNumberMany,
  collectionNumberProduct,
  isCollectionNumberValid,
  summarizeCollectionNumber,
} from './collection-number';
import { chunk, clampLength, hashString } from './collection-number-helpers';

describe('util-collection-number', () => {
  it('exposes its kind', () => {
    expect(COLLECTION_NUMBER_KIND).toBe('collection-number');
  });

  it('returns the fallback for empty input', () => {
    expect(collectionNumber('')).toBe(COLLECTION_NUMBER_DEFAULTS.fallback);
    expect(collectionNumber('   ')).toBe(COLLECTION_NUMBER_DEFAULTS.fallback);
    expect(collectionNumber('', { fallback: 'n/a' })).toBe('n/a');
  });

  it('formats non-empty values into a bounded string', () => {
    const result = collectionNumber('Wireless Headphones 42', {
      maxLength: 10,
    });
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
    expect(result.length).toBeLessThanOrEqual(10);
  });

  it('is deterministic', () => {
    expect(collectionNumber('same input')).toBe(collectionNumber('same input'));
    expect(compareCollectionNumber('same', 'same')).toBe(0);
  });

  it('formats many values', () => {
    expect(collectionNumberMany(['a', 2, 'c'])).toHaveLength(3);
  });

  it('validates input', () => {
    expect(isCollectionNumberValid('value')).toBe(true);
    expect(isCollectionNumberValid(12)).toBe(true);
    expect(isCollectionNumberValid('')).toBe(false);
    expect(isCollectionNumberValid(Number.NaN)).toBe(false);
    expect(isCollectionNumberValid(null)).toBe(false);
  });

  it('formats a product', () => {
    const result = collectionNumberProduct({
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
    const summary = summarizeCollectionNumber(['alpha', 'be', 'gamma-ray']);
    expect(summary.count).toBe(3);
    expect(summary.longest.length).toBeGreaterThanOrEqual(
      summary.shortest.length,
    );
    expect(summary.checksum).toBeGreaterThanOrEqual(0);
  });

  it('groups records by a key', () => {
    const grouped = collectionNumberKeyed(
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
