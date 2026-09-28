import { describe, expect, it } from 'vitest';
import {
  COLLECTION_PHONE_DEFAULTS,
  COLLECTION_PHONE_KIND,
  compareCollectionPhone,
  collectionPhone,
  collectionPhoneKeyed,
  collectionPhoneMany,
  collectionPhoneProduct,
  isCollectionPhoneValid,
  summarizeCollectionPhone,
} from './collection-phone';
import { chunk, clampLength, hashString } from './collection-phone-helpers';

describe('util-collection-phone', () => {
  it('exposes its kind', () => {
    expect(COLLECTION_PHONE_KIND).toBe('collection-phone');
  });

  it('returns the fallback for empty input', () => {
    expect(collectionPhone('')).toBe(COLLECTION_PHONE_DEFAULTS.fallback);
    expect(collectionPhone('   ')).toBe(COLLECTION_PHONE_DEFAULTS.fallback);
    expect(collectionPhone('', { fallback: 'n/a' })).toBe('n/a');
  });

  it('formats non-empty values into a bounded string', () => {
    const result = collectionPhone('Wireless Headphones 42', { maxLength: 10 });
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
    expect(result.length).toBeLessThanOrEqual(10);
  });

  it('is deterministic', () => {
    expect(collectionPhone('same input')).toBe(collectionPhone('same input'));
    expect(compareCollectionPhone('same', 'same')).toBe(0);
  });

  it('formats many values', () => {
    expect(collectionPhoneMany(['a', 2, 'c'])).toHaveLength(3);
  });

  it('validates input', () => {
    expect(isCollectionPhoneValid('value')).toBe(true);
    expect(isCollectionPhoneValid(12)).toBe(true);
    expect(isCollectionPhoneValid('')).toBe(false);
    expect(isCollectionPhoneValid(Number.NaN)).toBe(false);
    expect(isCollectionPhoneValid(null)).toBe(false);
  });

  it('formats a product', () => {
    const result = collectionPhoneProduct({
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
    const summary = summarizeCollectionPhone(['alpha', 'be', 'gamma-ray']);
    expect(summary.count).toBe(3);
    expect(summary.longest.length).toBeGreaterThanOrEqual(
      summary.shortest.length,
    );
    expect(summary.checksum).toBeGreaterThanOrEqual(0);
  });

  it('groups records by a key', () => {
    const grouped = collectionPhoneKeyed(
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
