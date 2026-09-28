import { describe, expect, it } from 'vitest';
import {
  ASYNC_PERCENT_DEFAULTS,
  ASYNC_PERCENT_KIND,
  compareAsyncPercent,
  asyncPercent,
  asyncPercentKeyed,
  asyncPercentMany,
  asyncPercentProduct,
  isAsyncPercentValid,
  summarizeAsyncPercent,
} from './async-percent';
import { chunk, clampLength, hashString } from './async-percent-helpers';

describe('util-async-percent', () => {
  it('exposes its kind', () => {
    expect(ASYNC_PERCENT_KIND).toBe('async-percent');
  });

  it('returns the fallback for empty input', () => {
    expect(asyncPercent('')).toBe(ASYNC_PERCENT_DEFAULTS.fallback);
    expect(asyncPercent('   ')).toBe(ASYNC_PERCENT_DEFAULTS.fallback);
    expect(asyncPercent('', { fallback: 'n/a' })).toBe('n/a');
  });

  it('formats non-empty values into a bounded string', () => {
    const result = asyncPercent('Wireless Headphones 42', { maxLength: 10 });
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
    expect(result.length).toBeLessThanOrEqual(10);
  });

  it('is deterministic', () => {
    expect(asyncPercent('same input')).toBe(asyncPercent('same input'));
    expect(compareAsyncPercent('same', 'same')).toBe(0);
  });

  it('formats many values', () => {
    expect(asyncPercentMany(['a', 2, 'c'])).toHaveLength(3);
  });

  it('validates input', () => {
    expect(isAsyncPercentValid('value')).toBe(true);
    expect(isAsyncPercentValid(12)).toBe(true);
    expect(isAsyncPercentValid('')).toBe(false);
    expect(isAsyncPercentValid(Number.NaN)).toBe(false);
    expect(isAsyncPercentValid(null)).toBe(false);
  });

  it('formats a product', () => {
    const result = asyncPercentProduct({
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
    const summary = summarizeAsyncPercent(['alpha', 'be', 'gamma-ray']);
    expect(summary.count).toBe(3);
    expect(summary.longest.length).toBeGreaterThanOrEqual(
      summary.shortest.length,
    );
    expect(summary.checksum).toBeGreaterThanOrEqual(0);
  });

  it('groups records by a key', () => {
    const grouped = asyncPercentKeyed(
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
