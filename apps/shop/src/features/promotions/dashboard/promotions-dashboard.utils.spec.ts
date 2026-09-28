import { describe, expect, it } from 'vitest';
import {
  buildPromotionsDashboardItems,
  PROMOTIONS_DASHBOARD_ITEM_COUNT,
} from './promotions-dashboard.model';
import {
  describePromotionsDashboardItem,
  filterPromotionsDashboard,
  groupPromotionsDashboardByStatus,
  pickPromotionsDashboardHighlights,
  sortPromotionsDashboard,
  totalPromotionsDashboard,
  promotionsDashboardStatusTone,
} from './promotions-dashboard.utils';

describe('promotions-dashboard utils', () => {
  const items = buildPromotionsDashboardItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(PROMOTIONS_DASHBOARD_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      PROMOTIONS_DASHBOARD_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalPromotionsDashboard(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupPromotionsDashboardByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterPromotionsDashboard(items, '')).toHaveLength(items.length);
    expect(
      filterPromotionsDashboard(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterPromotionsDashboard(items, 'no-such-thing-xyz')).toHaveLength(
      0,
    );
  });

  it('sorts by key in both directions', () => {
    const asc = sortPromotionsDashboard(items, 'amount', 'asc');
    const desc = sortPromotionsDashboard(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describePromotionsDashboardItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(promotionsDashboardStatusTone('active')).toBe('success');
    expect(promotionsDashboardStatusTone('pending')).toBe('warning');
    expect(promotionsDashboardStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickPromotionsDashboardHighlights(items, 2)).toHaveLength(2);
    expect(pickPromotionsDashboardHighlights(items, 0)).toHaveLength(0);
  });
});
