import { describe, expect, it } from 'vitest';
import {
  buildReviewsDetailsItems,
  REVIEWS_DETAILS_ITEM_COUNT,
} from './reviews-details.model';
import {
  describeReviewsDetailsItem,
  filterReviewsDetails,
  groupReviewsDetailsByStatus,
  pickReviewsDetailsHighlights,
  sortReviewsDetails,
  totalReviewsDetails,
  reviewsDetailsStatusTone,
} from './reviews-details.utils';

describe('reviews-details utils', () => {
  const items = buildReviewsDetailsItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(REVIEWS_DETAILS_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      REVIEWS_DETAILS_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalReviewsDetails(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupReviewsDetailsByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterReviewsDetails(items, '')).toHaveLength(items.length);
    expect(
      filterReviewsDetails(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterReviewsDetails(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortReviewsDetails(items, 'amount', 'asc');
    const desc = sortReviewsDetails(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeReviewsDetailsItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(reviewsDetailsStatusTone('active')).toBe('success');
    expect(reviewsDetailsStatusTone('pending')).toBe('warning');
    expect(reviewsDetailsStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickReviewsDetailsHighlights(items, 2)).toHaveLength(2);
    expect(pickReviewsDetailsHighlights(items, 0)).toHaveLength(0);
  });
});
