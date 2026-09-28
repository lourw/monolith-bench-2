import { describe, expect, it } from 'vitest';
import {
  buildRecommendationsDashboardItems,
  RECOMMENDATIONS_DASHBOARD_ITEM_COUNT,
} from './recommendations-dashboard.model';
import {
  describeRecommendationsDashboardItem,
  filterRecommendationsDashboard,
  groupRecommendationsDashboardByStatus,
  pickRecommendationsDashboardHighlights,
  sortRecommendationsDashboard,
  totalRecommendationsDashboard,
  recommendationsDashboardStatusTone,
} from './recommendations-dashboard.utils';

describe('recommendations-dashboard utils', () => {
  const items = buildRecommendationsDashboardItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(RECOMMENDATIONS_DASHBOARD_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      RECOMMENDATIONS_DASHBOARD_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalRecommendationsDashboard(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupRecommendationsDashboardByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterRecommendationsDashboard(items, '')).toHaveLength(
      items.length,
    );
    expect(
      filterRecommendationsDashboard(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(
      filterRecommendationsDashboard(items, 'no-such-thing-xyz'),
    ).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortRecommendationsDashboard(items, 'amount', 'asc');
    const desc = sortRecommendationsDashboard(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeRecommendationsDashboardItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(recommendationsDashboardStatusTone('active')).toBe('success');
    expect(recommendationsDashboardStatusTone('pending')).toBe('warning');
    expect(recommendationsDashboardStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickRecommendationsDashboardHighlights(items, 2)).toHaveLength(2);
    expect(pickRecommendationsDashboardHighlights(items, 0)).toHaveLength(0);
  });
});
