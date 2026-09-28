import { describe, expect, it } from 'vitest';
import {
  buildReviewsOverviewItems,
  REVIEWS_OVERVIEW_ITEM_COUNT,
} from './reviews-overview.model';
import {
  describeReviewsOverviewItem,
  filterReviewsOverview,
  groupReviewsOverviewByStatus,
  pickReviewsOverviewHighlights,
  sortReviewsOverview,
  totalReviewsOverview,
  reviewsOverviewStatusTone,
} from './reviews-overview.utils';

describe('reviews-overview utils', () => {
  const items = buildReviewsOverviewItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(REVIEWS_OVERVIEW_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      REVIEWS_OVERVIEW_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalReviewsOverview(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupReviewsOverviewByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterReviewsOverview(items, '')).toHaveLength(items.length);
    expect(
      filterReviewsOverview(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterReviewsOverview(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortReviewsOverview(items, 'amount', 'asc');
    const desc = sortReviewsOverview(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeReviewsOverviewItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(reviewsOverviewStatusTone('active')).toBe('success');
    expect(reviewsOverviewStatusTone('pending')).toBe('warning');
    expect(reviewsOverviewStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickReviewsOverviewHighlights(items, 2)).toHaveLength(2);
    expect(pickReviewsOverviewHighlights(items, 0)).toHaveLength(0);
  });
});
