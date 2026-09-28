import { describe, expect, it } from 'vitest';
import {
  COLLECTION_TEXT_DEFAULTS,
  COLLECTION_TEXT_KIND,
  compareCollectionText,
  collectionText,
  collectionTextKeyed,
  collectionTextMany,
  collectionTextProduct,
  isCollectionTextValid,
  summarizeCollectionText,
} from './collection-text';
import { chunk, clampLength, hashString } from './collection-text-helpers';

describe('util-collection-text', () => {
  it('exposes its kind', () => {
    expect(COLLECTION_TEXT_KIND).toBe('collection-text');
  });

  it('returns the fallback for empty input', () => {
    expect(collectionText('')).toBe(COLLECTION_TEXT_DEFAULTS.fallback);
    expect(collectionText('   ')).toBe(COLLECTION_TEXT_DEFAULTS.fallback);
    expect(collectionText('', { fallback: 'n/a' })).toBe('n/a');
  });

  it('formats non-empty values into a bounded string', () => {
    const result = collectionText('Wireless Headphones 42', { maxLength: 10 });
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
    expect(result.length).toBeLessThanOrEqual(10);
  });

  it('is deterministic', () => {
    expect(collectionText('same input')).toBe(collectionText('same input'));
    expect(compareCollectionText('same', 'same')).toBe(0);
  });

  it('formats many values', () => {
    expect(collectionTextMany(['a', 2, 'c'])).toHaveLength(3);
  });

  it('validates input', () => {
    expect(isCollectionTextValid('value')).toBe(true);
    expect(isCollectionTextValid(12)).toBe(true);
    expect(isCollectionTextValid('')).toBe(false);
    expect(isCollectionTextValid(Number.NaN)).toBe(false);
    expect(isCollectionTextValid(null)).toBe(false);
  });

  it('formats a product', () => {
    const result = collectionTextProduct({
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
    const summary = summarizeCollectionText(['alpha', 'be', 'gamma-ray']);
    expect(summary.count).toBe(3);
    expect(summary.longest.length).toBeGreaterThanOrEqual(
      summary.shortest.length,
    );
    expect(summary.checksum).toBeGreaterThanOrEqual(0);
  });

  it('groups records by a key', () => {
    const grouped = collectionTextKeyed(
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
