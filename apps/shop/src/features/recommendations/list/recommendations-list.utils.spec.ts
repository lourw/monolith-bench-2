import { describe, expect, it } from 'vitest';
import {
  buildRecommendationsListItems,
  RECOMMENDATIONS_LIST_ITEM_COUNT,
} from './recommendations-list.model';
import {
  describeRecommendationsListItem,
  filterRecommendationsList,
  groupRecommendationsListByStatus,
  pickRecommendationsListHighlights,
  sortRecommendationsList,
  totalRecommendationsList,
  recommendationsListStatusTone,
} from './recommendations-list.utils';

describe('recommendations-list utils', () => {
  const items = buildRecommendationsListItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(RECOMMENDATIONS_LIST_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      RECOMMENDATIONS_LIST_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalRecommendationsList(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupRecommendationsListByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterRecommendationsList(items, '')).toHaveLength(items.length);
    expect(
      filterRecommendationsList(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterRecommendationsList(items, 'no-such-thing-xyz')).toHaveLength(
      0,
    );
  });

  it('sorts by key in both directions', () => {
    const asc = sortRecommendationsList(items, 'amount', 'asc');
    const desc = sortRecommendationsList(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeRecommendationsListItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(recommendationsListStatusTone('active')).toBe('success');
    expect(recommendationsListStatusTone('pending')).toBe('warning');
    expect(recommendationsListStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickRecommendationsListHighlights(items, 2)).toHaveLength(2);
    expect(pickRecommendationsListHighlights(items, 0)).toHaveLength(0);
  });
});
