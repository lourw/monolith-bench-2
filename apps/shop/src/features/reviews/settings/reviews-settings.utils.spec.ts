import { describe, expect, it } from 'vitest';
import {
  buildReviewsSettingsItems,
  REVIEWS_SETTINGS_ITEM_COUNT,
} from './reviews-settings.model';
import {
  describeReviewsSettingsItem,
  filterReviewsSettings,
  groupReviewsSettingsByStatus,
  pickReviewsSettingsHighlights,
  sortReviewsSettings,
  totalReviewsSettings,
  reviewsSettingsStatusTone,
} from './reviews-settings.utils';

describe('reviews-settings utils', () => {
  const items = buildReviewsSettingsItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(REVIEWS_SETTINGS_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      REVIEWS_SETTINGS_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalReviewsSettings(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupReviewsSettingsByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterReviewsSettings(items, '')).toHaveLength(items.length);
    expect(
      filterReviewsSettings(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterReviewsSettings(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortReviewsSettings(items, 'amount', 'asc');
    const desc = sortReviewsSettings(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeReviewsSettingsItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(reviewsSettingsStatusTone('active')).toBe('success');
    expect(reviewsSettingsStatusTone('pending')).toBe('warning');
    expect(reviewsSettingsStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickReviewsSettingsHighlights(items, 2)).toHaveLength(2);
    expect(pickReviewsSettingsHighlights(items, 0)).toHaveLength(0);
  });
});
