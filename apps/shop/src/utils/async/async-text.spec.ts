import { describe, expect, it } from 'vitest';
import {
  ASYNC_TEXT_DEFAULTS,
  ASYNC_TEXT_KIND,
  compareAsyncText,
  asyncText,
  asyncTextKeyed,
  asyncTextMany,
  asyncTextProduct,
  isAsyncTextValid,
  summarizeAsyncText,
} from './async-text';
import { chunk, clampLength, hashString } from './async-text-helpers';

describe('util-async-text', () => {
  it('exposes its kind', () => {
    expect(ASYNC_TEXT_KIND).toBe('async-text');
  });

  it('returns the fallback for empty input', () => {
    expect(asyncText('')).toBe(ASYNC_TEXT_DEFAULTS.fallback);
    expect(asyncText('   ')).toBe(ASYNC_TEXT_DEFAULTS.fallback);
    expect(asyncText('', { fallback: 'n/a' })).toBe('n/a');
  });

  it('formats non-empty values into a bounded string', () => {
    const result = asyncText('Wireless Headphones 42', { maxLength: 10 });
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
    expect(result.length).toBeLessThanOrEqual(10);
  });

  it('is deterministic', () => {
    expect(asyncText('same input')).toBe(asyncText('same input'));
    expect(compareAsyncText('same', 'same')).toBe(0);
  });

  it('formats many values', () => {
    expect(asyncTextMany(['a', 2, 'c'])).toHaveLength(3);
  });

  it('validates input', () => {
    expect(isAsyncTextValid('value')).toBe(true);
    expect(isAsyncTextValid(12)).toBe(true);
    expect(isAsyncTextValid('')).toBe(false);
    expect(isAsyncTextValid(Number.NaN)).toBe(false);
    expect(isAsyncTextValid(null)).toBe(false);
  });

  it('formats a product', () => {
    const result = asyncTextProduct({
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
    const summary = summarizeAsyncText(['alpha', 'be', 'gamma-ray']);
    expect(summary.count).toBe(3);
    expect(summary.longest.length).toBeGreaterThanOrEqual(
      summary.shortest.length,
    );
    expect(summary.checksum).toBeGreaterThanOrEqual(0);
  });

  it('groups records by a key', () => {
    const grouped = asyncTextKeyed(
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
