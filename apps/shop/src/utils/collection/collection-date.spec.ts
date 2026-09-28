import { describe, expect, it } from 'vitest';
import {
  COLLECTION_DATE_DEFAULTS,
  COLLECTION_DATE_KIND,
  compareCollectionDate,
  collectionDate,
  collectionDateKeyed,
  collectionDateMany,
  collectionDateProduct,
  isCollectionDateValid,
  summarizeCollectionDate,
} from './collection-date';
import { chunk, clampLength, hashString } from './collection-date-helpers';

describe('util-collection-date', () => {
  it('exposes its kind', () => {
    expect(COLLECTION_DATE_KIND).toBe('collection-date');
  });

  it('returns the fallback for empty input', () => {
    expect(collectionDate('')).toBe(COLLECTION_DATE_DEFAULTS.fallback);
    expect(collectionDate('   ')).toBe(COLLECTION_DATE_DEFAULTS.fallback);
    expect(collectionDate('', { fallback: 'n/a' })).toBe('n/a');
  });

  it('formats non-empty values into a bounded string', () => {
    const result = collectionDate('Wireless Headphones 42', { maxLength: 10 });
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
    expect(result.length).toBeLessThanOrEqual(10);
  });

  it('is deterministic', () => {
    expect(collectionDate('same input')).toBe(collectionDate('same input'));
    expect(compareCollectionDate('same', 'same')).toBe(0);
  });

  it('formats many values', () => {
    expect(collectionDateMany(['a', 2, 'c'])).toHaveLength(3);
  });

  it('validates input', () => {
    expect(isCollectionDateValid('value')).toBe(true);
    expect(isCollectionDateValid(12)).toBe(true);
    expect(isCollectionDateValid('')).toBe(false);
    expect(isCollectionDateValid(Number.NaN)).toBe(false);
    expect(isCollectionDateValid(null)).toBe(false);
  });

  it('formats a product', () => {
    const result = collectionDateProduct({
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
    const summary = summarizeCollectionDate(['alpha', 'be', 'gamma-ray']);
    expect(summary.count).toBe(3);
    expect(summary.longest.length).toBeGreaterThanOrEqual(
      summary.shortest.length,
    );
    expect(summary.checksum).toBeGreaterThanOrEqual(0);
  });

  it('groups records by a key', () => {
    const grouped = collectionDateKeyed(
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
