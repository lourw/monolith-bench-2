import { describe, expect, it } from 'vitest';
import {
  ASYNC_NAME_DEFAULTS,
  ASYNC_NAME_KIND,
  compareAsyncName,
  asyncName,
  asyncNameKeyed,
  asyncNameMany,
  asyncNameProduct,
  isAsyncNameValid,
  summarizeAsyncName,
} from './async-name';
import { chunk, clampLength, hashString } from './async-name-helpers';

describe('util-async-name', () => {
  it('exposes its kind', () => {
    expect(ASYNC_NAME_KIND).toBe('async-name');
  });

  it('returns the fallback for empty input', () => {
    expect(asyncName('')).toBe(ASYNC_NAME_DEFAULTS.fallback);
    expect(asyncName('   ')).toBe(ASYNC_NAME_DEFAULTS.fallback);
    expect(asyncName('', { fallback: 'n/a' })).toBe('n/a');
  });

  it('formats non-empty values into a bounded string', () => {
    const result = asyncName('Wireless Headphones 42', { maxLength: 10 });
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
    expect(result.length).toBeLessThanOrEqual(10);
  });

  it('is deterministic', () => {
    expect(asyncName('same input')).toBe(asyncName('same input'));
    expect(compareAsyncName('same', 'same')).toBe(0);
  });

  it('formats many values', () => {
    expect(asyncNameMany(['a', 2, 'c'])).toHaveLength(3);
  });

  it('validates input', () => {
    expect(isAsyncNameValid('value')).toBe(true);
    expect(isAsyncNameValid(12)).toBe(true);
    expect(isAsyncNameValid('')).toBe(false);
    expect(isAsyncNameValid(Number.NaN)).toBe(false);
    expect(isAsyncNameValid(null)).toBe(false);
  });

  it('formats a product', () => {
    const result = asyncNameProduct({
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
    const summary = summarizeAsyncName(['alpha', 'be', 'gamma-ray']);
    expect(summary.count).toBe(3);
    expect(summary.longest.length).toBeGreaterThanOrEqual(
      summary.shortest.length,
    );
    expect(summary.checksum).toBeGreaterThanOrEqual(0);
  });

  it('groups records by a key', () => {
    const grouped = asyncNameKeyed(
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
