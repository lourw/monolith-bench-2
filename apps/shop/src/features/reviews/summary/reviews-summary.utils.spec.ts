import { describe, expect, it } from 'vitest';
import {
  buildReviewsSummaryItems,
  REVIEWS_SUMMARY_ITEM_COUNT,
} from './reviews-summary.model';
import {
  describeReviewsSummaryItem,
  filterReviewsSummary,
  groupReviewsSummaryByStatus,
  pickReviewsSummaryHighlights,
  sortReviewsSummary,
  totalReviewsSummary,
  reviewsSummaryStatusTone,
} from './reviews-summary.utils';

describe('reviews-summary utils', () => {
  const items = buildReviewsSummaryItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(REVIEWS_SUMMARY_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      REVIEWS_SUMMARY_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalReviewsSummary(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupReviewsSummaryByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterReviewsSummary(items, '')).toHaveLength(items.length);
    expect(
      filterReviewsSummary(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterReviewsSummary(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortReviewsSummary(items, 'amount', 'asc');
    const desc = sortReviewsSummary(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeReviewsSummaryItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(reviewsSummaryStatusTone('active')).toBe('success');
    expect(reviewsSummaryStatusTone('pending')).toBe('warning');
    expect(reviewsSummaryStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickReviewsSummaryHighlights(items, 2)).toHaveLength(2);
    expect(pickReviewsSummaryHighlights(items, 0)).toHaveLength(0);
  });
});
