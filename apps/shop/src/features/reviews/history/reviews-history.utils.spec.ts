import { describe, expect, it } from 'vitest';
import {
  buildReviewsHistoryItems,
  REVIEWS_HISTORY_ITEM_COUNT,
} from './reviews-history.model';
import {
  describeReviewsHistoryItem,
  filterReviewsHistory,
  groupReviewsHistoryByStatus,
  pickReviewsHistoryHighlights,
  sortReviewsHistory,
  totalReviewsHistory,
  reviewsHistoryStatusTone,
} from './reviews-history.utils';

describe('reviews-history utils', () => {
  const items = buildReviewsHistoryItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(REVIEWS_HISTORY_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      REVIEWS_HISTORY_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalReviewsHistory(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupReviewsHistoryByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterReviewsHistory(items, '')).toHaveLength(items.length);
    expect(
      filterReviewsHistory(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterReviewsHistory(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortReviewsHistory(items, 'amount', 'asc');
    const desc = sortReviewsHistory(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeReviewsHistoryItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(reviewsHistoryStatusTone('active')).toBe('success');
    expect(reviewsHistoryStatusTone('pending')).toBe('warning');
    expect(reviewsHistoryStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickReviewsHistoryHighlights(items, 2)).toHaveLength(2);
    expect(pickReviewsHistoryHighlights(items, 0)).toHaveLength(0);
  });
});
