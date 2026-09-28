import { describe, expect, it } from 'vitest';
import {
  COLLECTION_CODE_DEFAULTS,
  COLLECTION_CODE_KIND,
  compareCollectionCode,
  collectionCode,
  collectionCodeKeyed,
  collectionCodeMany,
  collectionCodeProduct,
  isCollectionCodeValid,
  summarizeCollectionCode,
} from './collection-code';
import { chunk, clampLength, hashString } from './collection-code-helpers';

describe('util-collection-code', () => {
  it('exposes its kind', () => {
    expect(COLLECTION_CODE_KIND).toBe('collection-code');
  });

  it('returns the fallback for empty input', () => {
    expect(collectionCode('')).toBe(COLLECTION_CODE_DEFAULTS.fallback);
    expect(collectionCode('   ')).toBe(COLLECTION_CODE_DEFAULTS.fallback);
    expect(collectionCode('', { fallback: 'n/a' })).toBe('n/a');
  });

  it('formats non-empty values into a bounded string', () => {
    const result = collectionCode('Wireless Headphones 42', { maxLength: 10 });
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
    expect(result.length).toBeLessThanOrEqual(10);
  });

  it('is deterministic', () => {
    expect(collectionCode('same input')).toBe(collectionCode('same input'));
    expect(compareCollectionCode('same', 'same')).toBe(0);
  });

  it('formats many values', () => {
    expect(collectionCodeMany(['a', 2, 'c'])).toHaveLength(3);
  });

  it('validates input', () => {
    expect(isCollectionCodeValid('value')).toBe(true);
    expect(isCollectionCodeValid(12)).toBe(true);
    expect(isCollectionCodeValid('')).toBe(false);
    expect(isCollectionCodeValid(Number.NaN)).toBe(false);
    expect(isCollectionCodeValid(null)).toBe(false);
  });

  it('formats a product', () => {
    const result = collectionCodeProduct({
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
    const summary = summarizeCollectionCode(['alpha', 'be', 'gamma-ray']);
    expect(summary.count).toBe(3);
    expect(summary.longest.length).toBeGreaterThanOrEqual(
      summary.shortest.length,
    );
    expect(summary.checksum).toBeGreaterThanOrEqual(0);
  });

  it('groups records by a key', () => {
    const grouped = collectionCodeKeyed(
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
