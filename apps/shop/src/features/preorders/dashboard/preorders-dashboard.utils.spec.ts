import { describe, expect, it } from 'vitest';
import {
  buildPreordersDashboardItems,
  PREORDERS_DASHBOARD_ITEM_COUNT,
} from './preorders-dashboard.model';
import {
  describePreordersDashboardItem,
  filterPreordersDashboard,
  groupPreordersDashboardByStatus,
  pickPreordersDashboardHighlights,
  sortPreordersDashboard,
  totalPreordersDashboard,
  preordersDashboardStatusTone,
} from './preorders-dashboard.utils';

describe('preorders-dashboard utils', () => {
  const items = buildPreordersDashboardItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(PREORDERS_DASHBOARD_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      PREORDERS_DASHBOARD_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalPreordersDashboard(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupPreordersDashboardByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterPreordersDashboard(items, '')).toHaveLength(items.length);
    expect(
      filterPreordersDashboard(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterPreordersDashboard(items, 'no-such-thing-xyz')).toHaveLength(
      0,
    );
  });

  it('sorts by key in both directions', () => {
    const asc = sortPreordersDashboard(items, 'amount', 'asc');
    const desc = sortPreordersDashboard(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describePreordersDashboardItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(preordersDashboardStatusTone('active')).toBe('success');
    expect(preordersDashboardStatusTone('pending')).toBe('warning');
    expect(preordersDashboardStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickPreordersDashboardHighlights(items, 2)).toHaveLength(2);
    expect(pickPreordersDashboardHighlights(items, 0)).toHaveLength(0);
  });
});
