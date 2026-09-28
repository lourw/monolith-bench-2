import { describe, expect, it } from 'vitest';
import {
  ASYNC_CODE_DEFAULTS,
  ASYNC_CODE_KIND,
  compareAsyncCode,
  asyncCode,
  asyncCodeKeyed,
  asyncCodeMany,
  asyncCodeProduct,
  isAsyncCodeValid,
  summarizeAsyncCode,
} from './async-code';
import { chunk, clampLength, hashString } from './async-code-helpers';

describe('util-async-code', () => {
  it('exposes its kind', () => {
    expect(ASYNC_CODE_KIND).toBe('async-code');
  });

  it('returns the fallback for empty input', () => {
    expect(asyncCode('')).toBe(ASYNC_CODE_DEFAULTS.fallback);
    expect(asyncCode('   ')).toBe(ASYNC_CODE_DEFAULTS.fallback);
    expect(asyncCode('', { fallback: 'n/a' })).toBe('n/a');
  });

  it('formats non-empty values into a bounded string', () => {
    const result = asyncCode('Wireless Headphones 42', { maxLength: 10 });
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
    expect(result.length).toBeLessThanOrEqual(10);
  });

  it('is deterministic', () => {
    expect(asyncCode('same input')).toBe(asyncCode('same input'));
    expect(compareAsyncCode('same', 'same')).toBe(0);
  });

  it('formats many values', () => {
    expect(asyncCodeMany(['a', 2, 'c'])).toHaveLength(3);
  });

  it('validates input', () => {
    expect(isAsyncCodeValid('value')).toBe(true);
    expect(isAsyncCodeValid(12)).toBe(true);
    expect(isAsyncCodeValid('')).toBe(false);
    expect(isAsyncCodeValid(Number.NaN)).toBe(false);
    expect(isAsyncCodeValid(null)).toBe(false);
  });

  it('formats a product', () => {
    const result = asyncCodeProduct({
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
    const summary = summarizeAsyncCode(['alpha', 'be', 'gamma-ray']);
    expect(summary.count).toBe(3);
    expect(summary.longest.length).toBeGreaterThanOrEqual(
      summary.shortest.length,
    );
    expect(summary.checksum).toBeGreaterThanOrEqual(0);
  });

  it('groups records by a key', () => {
    const grouped = asyncCodeKeyed(
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
