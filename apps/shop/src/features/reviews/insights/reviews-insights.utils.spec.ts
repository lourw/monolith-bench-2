import { describe, expect, it } from 'vitest';
import {
  buildReviewsInsightsItems,
  REVIEWS_INSIGHTS_ITEM_COUNT,
} from './reviews-insights.model';
import {
  describeReviewsInsightsItem,
  filterReviewsInsights,
  groupReviewsInsightsByStatus,
  pickReviewsInsightsHighlights,
  sortReviewsInsights,
  totalReviewsInsights,
  reviewsInsightsStatusTone,
} from './reviews-insights.utils';

describe('reviews-insights utils', () => {
  const items = buildReviewsInsightsItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(REVIEWS_INSIGHTS_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      REVIEWS_INSIGHTS_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalReviewsInsights(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupReviewsInsightsByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterReviewsInsights(items, '')).toHaveLength(items.length);
    expect(
      filterReviewsInsights(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterReviewsInsights(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortReviewsInsights(items, 'amount', 'asc');
    const desc = sortReviewsInsights(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeReviewsInsightsItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(reviewsInsightsStatusTone('active')).toBe('success');
    expect(reviewsInsightsStatusTone('pending')).toBe('warning');
    expect(reviewsInsightsStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickReviewsInsightsHighlights(items, 2)).toHaveLength(2);
    expect(pickReviewsInsightsHighlights(items, 0)).toHaveLength(0);
  });
});
