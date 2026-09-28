import { describe, expect, it } from 'vitest';
import {
  ASYNC_NUMBER_DEFAULTS,
  ASYNC_NUMBER_KIND,
  compareAsyncNumber,
  asyncNumber,
  asyncNumberKeyed,
  asyncNumberMany,
  asyncNumberProduct,
  isAsyncNumberValid,
  summarizeAsyncNumber,
} from './async-number';
import { chunk, clampLength, hashString } from './async-number-helpers';

describe('util-async-number', () => {
  it('exposes its kind', () => {
    expect(ASYNC_NUMBER_KIND).toBe('async-number');
  });

  it('returns the fallback for empty input', () => {
    expect(asyncNumber('')).toBe(ASYNC_NUMBER_DEFAULTS.fallback);
    expect(asyncNumber('   ')).toBe(ASYNC_NUMBER_DEFAULTS.fallback);
    expect(asyncNumber('', { fallback: 'n/a' })).toBe('n/a');
  });

  it('formats non-empty values into a bounded string', () => {
    const result = asyncNumber('Wireless Headphones 42', { maxLength: 10 });
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
    expect(result.length).toBeLessThanOrEqual(10);
  });

  it('is deterministic', () => {
    expect(asyncNumber('same input')).toBe(asyncNumber('same input'));
    expect(compareAsyncNumber('same', 'same')).toBe(0);
  });

  it('formats many values', () => {
    expect(asyncNumberMany(['a', 2, 'c'])).toHaveLength(3);
  });

  it('validates input', () => {
    expect(isAsyncNumberValid('value')).toBe(true);
    expect(isAsyncNumberValid(12)).toBe(true);
    expect(isAsyncNumberValid('')).toBe(false);
    expect(isAsyncNumberValid(Number.NaN)).toBe(false);
    expect(isAsyncNumberValid(null)).toBe(false);
  });

  it('formats a product', () => {
    const result = asyncNumberProduct({
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
    const summary = summarizeAsyncNumber(['alpha', 'be', 'gamma-ray']);
    expect(summary.count).toBe(3);
    expect(summary.longest.length).toBeGreaterThanOrEqual(
      summary.shortest.length,
    );
    expect(summary.checksum).toBeGreaterThanOrEqual(0);
  });

  it('groups records by a key', () => {
    const grouped = asyncNumberKeyed(
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
