import { describe, expect, it } from 'vitest';
import {
  COLLECTION_SLUG_DEFAULTS,
  COLLECTION_SLUG_KIND,
  compareCollectionSlug,
  collectionSlug,
  collectionSlugKeyed,
  collectionSlugMany,
  collectionSlugProduct,
  isCollectionSlugValid,
  summarizeCollectionSlug,
} from './collection-slug';
import { chunk, clampLength, hashString } from './collection-slug-helpers';

describe('util-collection-slug', () => {
  it('exposes its kind', () => {
    expect(COLLECTION_SLUG_KIND).toBe('collection-slug');
  });

  it('returns the fallback for empty input', () => {
    expect(collectionSlug('')).toBe(COLLECTION_SLUG_DEFAULTS.fallback);
    expect(collectionSlug('   ')).toBe(COLLECTION_SLUG_DEFAULTS.fallback);
    expect(collectionSlug('', { fallback: 'n/a' })).toBe('n/a');
  });

  it('formats non-empty values into a bounded string', () => {
    const result = collectionSlug('Wireless Headphones 42', { maxLength: 10 });
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
    expect(result.length).toBeLessThanOrEqual(10);
  });

  it('is deterministic', () => {
    expect(collectionSlug('same input')).toBe(collectionSlug('same input'));
    expect(compareCollectionSlug('same', 'same')).toBe(0);
  });

  it('formats many values', () => {
    expect(collectionSlugMany(['a', 2, 'c'])).toHaveLength(3);
  });

  it('validates input', () => {
    expect(isCollectionSlugValid('value')).toBe(true);
    expect(isCollectionSlugValid(12)).toBe(true);
    expect(isCollectionSlugValid('')).toBe(false);
    expect(isCollectionSlugValid(Number.NaN)).toBe(false);
    expect(isCollectionSlugValid(null)).toBe(false);
  });

  it('formats a product', () => {
    const result = collectionSlugProduct({
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
    const summary = summarizeCollectionSlug(['alpha', 'be', 'gamma-ray']);
    expect(summary.count).toBe(3);
    expect(summary.longest.length).toBeGreaterThanOrEqual(
      summary.shortest.length,
    );
    expect(summary.checksum).toBeGreaterThanOrEqual(0);
  });

  it('groups records by a key', () => {
    const grouped = collectionSlugKeyed(
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
