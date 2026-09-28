import { describe, expect, it } from 'vitest';
import {
  COLLECTION_CURRENCY_DEFAULTS,
  COLLECTION_CURRENCY_KIND,
  compareCollectionCurrency,
  collectionCurrency,
  collectionCurrencyKeyed,
  collectionCurrencyMany,
  collectionCurrencyProduct,
  isCollectionCurrencyValid,
  summarizeCollectionCurrency,
} from './collection-currency';
import { chunk, clampLength, hashString } from './collection-currency-helpers';

describe('util-collection-currency', () => {
  it('exposes its kind', () => {
    expect(COLLECTION_CURRENCY_KIND).toBe('collection-currency');
  });

  it('returns the fallback for empty input', () => {
    expect(collectionCurrency('')).toBe(COLLECTION_CURRENCY_DEFAULTS.fallback);
    expect(collectionCurrency('   ')).toBe(
      COLLECTION_CURRENCY_DEFAULTS.fallback,
    );
    expect(collectionCurrency('', { fallback: 'n/a' })).toBe('n/a');
  });

  it('formats non-empty values into a bounded string', () => {
    const result = collectionCurrency('Wireless Headphones 42', {
      maxLength: 10,
    });
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
    expect(result.length).toBeLessThanOrEqual(10);
  });

  it('is deterministic', () => {
    expect(collectionCurrency('same input')).toBe(
      collectionCurrency('same input'),
    );
    expect(compareCollectionCurrency('same', 'same')).toBe(0);
  });

  it('formats many values', () => {
    expect(collectionCurrencyMany(['a', 2, 'c'])).toHaveLength(3);
  });

  it('validates input', () => {
    expect(isCollectionCurrencyValid('value')).toBe(true);
    expect(isCollectionCurrencyValid(12)).toBe(true);
    expect(isCollectionCurrencyValid('')).toBe(false);
    expect(isCollectionCurrencyValid(Number.NaN)).toBe(false);
    expect(isCollectionCurrencyValid(null)).toBe(false);
  });

  it('formats a product', () => {
    const result = collectionCurrencyProduct({
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
    const summary = summarizeCollectionCurrency(['alpha', 'be', 'gamma-ray']);
    expect(summary.count).toBe(3);
    expect(summary.longest.length).toBeGreaterThanOrEqual(
      summary.shortest.length,
    );
    expect(summary.checksum).toBeGreaterThanOrEqual(0);
  });

  it('groups records by a key', () => {
    const grouped = collectionCurrencyKeyed(
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
