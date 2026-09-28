import { describe, expect, it } from 'vitest';
import {
  VALIDATE_SLUG_DEFAULTS,
  VALIDATE_SLUG_KIND,
  compareValidateSlug,
  validateSlug,
  validateSlugKeyed,
  validateSlugMany,
  validateSlugProduct,
  isValidateSlugValid,
  summarizeValidateSlug,
} from './validate-slug';
import { chunk, clampLength, hashString } from './validate-slug-helpers';

describe('util-validate-slug', () => {
  it('exposes its kind', () => {
    expect(VALIDATE_SLUG_KIND).toBe('validate-slug');
  });

  it('returns the fallback for empty input', () => {
    expect(validateSlug('')).toBe(VALIDATE_SLUG_DEFAULTS.fallback);
    expect(validateSlug('   ')).toBe(VALIDATE_SLUG_DEFAULTS.fallback);
    expect(validateSlug('', { fallback: 'n/a' })).toBe('n/a');
  });

  it('formats non-empty values into a bounded string', () => {
    const result = validateSlug('Wireless Headphones 42', { maxLength: 10 });
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
    expect(result.length).toBeLessThanOrEqual(10);
  });

  it('is deterministic', () => {
    expect(validateSlug('same input')).toBe(validateSlug('same input'));
    expect(compareValidateSlug('same', 'same')).toBe(0);
  });

  it('formats many values', () => {
    expect(validateSlugMany(['a', 2, 'c'])).toHaveLength(3);
  });

  it('validates input', () => {
    expect(isValidateSlugValid('value')).toBe(true);
    expect(isValidateSlugValid(12)).toBe(true);
    expect(isValidateSlugValid('')).toBe(false);
    expect(isValidateSlugValid(Number.NaN)).toBe(false);
    expect(isValidateSlugValid(null)).toBe(false);
  });

  it('formats a product', () => {
    const result = validateSlugProduct({
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
    const summary = summarizeValidateSlug(['alpha', 'be', 'gamma-ray']);
    expect(summary.count).toBe(3);
    expect(summary.longest.length).toBeGreaterThanOrEqual(
      summary.shortest.length,
    );
    expect(summary.checksum).toBeGreaterThanOrEqual(0);
  });

  it('groups records by a key', () => {
    const grouped = validateSlugKeyed(
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
