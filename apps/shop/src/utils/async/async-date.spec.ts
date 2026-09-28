import { describe, expect, it } from 'vitest';
import {
  ASYNC_DATE_DEFAULTS,
  ASYNC_DATE_KIND,
  compareAsyncDate,
  asyncDate,
  asyncDateKeyed,
  asyncDateMany,
  asyncDateProduct,
  isAsyncDateValid,
  summarizeAsyncDate,
} from './async-date';
import { chunk, clampLength, hashString } from './async-date-helpers';

describe('util-async-date', () => {
  it('exposes its kind', () => {
    expect(ASYNC_DATE_KIND).toBe('async-date');
  });

  it('returns the fallback for empty input', () => {
    expect(asyncDate('')).toBe(ASYNC_DATE_DEFAULTS.fallback);
    expect(asyncDate('   ')).toBe(ASYNC_DATE_DEFAULTS.fallback);
    expect(asyncDate('', { fallback: 'n/a' })).toBe('n/a');
  });

  it('formats non-empty values into a bounded string', () => {
    const result = asyncDate('Wireless Headphones 42', { maxLength: 10 });
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
    expect(result.length).toBeLessThanOrEqual(10);
  });

  it('is deterministic', () => {
    expect(asyncDate('same input')).toBe(asyncDate('same input'));
    expect(compareAsyncDate('same', 'same')).toBe(0);
  });

  it('formats many values', () => {
    expect(asyncDateMany(['a', 2, 'c'])).toHaveLength(3);
  });

  it('validates input', () => {
    expect(isAsyncDateValid('value')).toBe(true);
    expect(isAsyncDateValid(12)).toBe(true);
    expect(isAsyncDateValid('')).toBe(false);
    expect(isAsyncDateValid(Number.NaN)).toBe(false);
    expect(isAsyncDateValid(null)).toBe(false);
  });

  it('formats a product', () => {
    const result = asyncDateProduct({
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
    const summary = summarizeAsyncDate(['alpha', 'be', 'gamma-ray']);
    expect(summary.count).toBe(3);
    expect(summary.longest.length).toBeGreaterThanOrEqual(
      summary.shortest.length,
    );
    expect(summary.checksum).toBeGreaterThanOrEqual(0);
  });

  it('groups records by a key', () => {
    const grouped = asyncDateKeyed(
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
