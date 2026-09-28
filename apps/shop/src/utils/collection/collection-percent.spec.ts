import { describe, expect, it } from 'vitest';
import {
  COLLECTION_PERCENT_DEFAULTS,
  COLLECTION_PERCENT_KIND,
  compareCollectionPercent,
  collectionPercent,
  collectionPercentKeyed,
  collectionPercentMany,
  collectionPercentProduct,
  isCollectionPercentValid,
  summarizeCollectionPercent,
} from './collection-percent';
import { chunk, clampLength, hashString } from './collection-percent-helpers';

describe('util-collection-percent', () => {
  it('exposes its kind', () => {
    expect(COLLECTION_PERCENT_KIND).toBe('collection-percent');
  });

  it('returns the fallback for empty input', () => {
    expect(collectionPercent('')).toBe(COLLECTION_PERCENT_DEFAULTS.fallback);
    expect(collectionPercent('   ')).toBe(COLLECTION_PERCENT_DEFAULTS.fallback);
    expect(collectionPercent('', { fallback: 'n/a' })).toBe('n/a');
  });

  it('formats non-empty values into a bounded string', () => {
    const result = collectionPercent('Wireless Headphones 42', {
      maxLength: 10,
    });
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
    expect(result.length).toBeLessThanOrEqual(10);
  });

  it('is deterministic', () => {
    expect(collectionPercent('same input')).toBe(
      collectionPercent('same input'),
    );
    expect(compareCollectionPercent('same', 'same')).toBe(0);
  });

  it('formats many values', () => {
    expect(collectionPercentMany(['a', 2, 'c'])).toHaveLength(3);
  });

  it('validates input', () => {
    expect(isCollectionPercentValid('value')).toBe(true);
    expect(isCollectionPercentValid(12)).toBe(true);
    expect(isCollectionPercentValid('')).toBe(false);
    expect(isCollectionPercentValid(Number.NaN)).toBe(false);
    expect(isCollectionPercentValid(null)).toBe(false);
  });

  it('formats a product', () => {
    const result = collectionPercentProduct({
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
    const summary = summarizeCollectionPercent(['alpha', 'be', 'gamma-ray']);
    expect(summary.count).toBe(3);
    expect(summary.longest.length).toBeGreaterThanOrEqual(
      summary.shortest.length,
    );
    expect(summary.checksum).toBeGreaterThanOrEqual(0);
  });

  it('groups records by a key', () => {
    const grouped = collectionPercentKeyed(
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
