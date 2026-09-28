import { describe, expect, it } from 'vitest';
import {
  buildRecommendationsDetailsItems,
  RECOMMENDATIONS_DETAILS_ITEM_COUNT,
} from './recommendations-details.model';
import {
  describeRecommendationsDetailsItem,
  filterRecommendationsDetails,
  groupRecommendationsDetailsByStatus,
  pickRecommendationsDetailsHighlights,
  sortRecommendationsDetails,
  totalRecommendationsDetails,
  recommendationsDetailsStatusTone,
} from './recommendations-details.utils';

describe('recommendations-details utils', () => {
  const items = buildRecommendationsDetailsItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(RECOMMENDATIONS_DETAILS_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      RECOMMENDATIONS_DETAILS_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalRecommendationsDetails(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupRecommendationsDetailsByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterRecommendationsDetails(items, '')).toHaveLength(items.length);
    expect(
      filterRecommendationsDetails(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(
      filterRecommendationsDetails(items, 'no-such-thing-xyz'),
    ).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortRecommendationsDetails(items, 'amount', 'asc');
    const desc = sortRecommendationsDetails(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeRecommendationsDetailsItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(recommendationsDetailsStatusTone('active')).toBe('success');
    expect(recommendationsDetailsStatusTone('pending')).toBe('warning');
    expect(recommendationsDetailsStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickRecommendationsDetailsHighlights(items, 2)).toHaveLength(2);
    expect(pickRecommendationsDetailsHighlights(items, 0)).toHaveLength(0);
  });
});
