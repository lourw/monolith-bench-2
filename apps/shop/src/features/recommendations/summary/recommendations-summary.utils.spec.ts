import { describe, expect, it } from 'vitest';
import {
  buildRecommendationsSummaryItems,
  RECOMMENDATIONS_SUMMARY_ITEM_COUNT,
} from './recommendations-summary.model';
import {
  describeRecommendationsSummaryItem,
  filterRecommendationsSummary,
  groupRecommendationsSummaryByStatus,
  pickRecommendationsSummaryHighlights,
  sortRecommendationsSummary,
  totalRecommendationsSummary,
  recommendationsSummaryStatusTone,
} from './recommendations-summary.utils';

describe('recommendations-summary utils', () => {
  const items = buildRecommendationsSummaryItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(RECOMMENDATIONS_SUMMARY_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      RECOMMENDATIONS_SUMMARY_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalRecommendationsSummary(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupRecommendationsSummaryByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterRecommendationsSummary(items, '')).toHaveLength(items.length);
    expect(
      filterRecommendationsSummary(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(
      filterRecommendationsSummary(items, 'no-such-thing-xyz'),
    ).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortRecommendationsSummary(items, 'amount', 'asc');
    const desc = sortRecommendationsSummary(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeRecommendationsSummaryItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(recommendationsSummaryStatusTone('active')).toBe('success');
    expect(recommendationsSummaryStatusTone('pending')).toBe('warning');
    expect(recommendationsSummaryStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickRecommendationsSummaryHighlights(items, 2)).toHaveLength(2);
    expect(pickRecommendationsSummaryHighlights(items, 0)).toHaveLength(0);
  });
});
