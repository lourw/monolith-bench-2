import { describe, expect, it } from 'vitest';
import {
  buildAddressesDashboardItems,
  ADDRESSES_DASHBOARD_ITEM_COUNT,
} from './addresses-dashboard.model';
import {
  describeAddressesDashboardItem,
  filterAddressesDashboard,
  groupAddressesDashboardByStatus,
  pickAddressesDashboardHighlights,
  sortAddressesDashboard,
  totalAddressesDashboard,
  addressesDashboardStatusTone,
} from './addresses-dashboard.utils';

describe('addresses-dashboard utils', () => {
  const items = buildAddressesDashboardItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(ADDRESSES_DASHBOARD_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      ADDRESSES_DASHBOARD_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalAddressesDashboard(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupAddressesDashboardByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterAddressesDashboard(items, '')).toHaveLength(items.length);
    expect(
      filterAddressesDashboard(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterAddressesDashboard(items, 'no-such-thing-xyz')).toHaveLength(
      0,
    );
  });

  it('sorts by key in both directions', () => {
    const asc = sortAddressesDashboard(items, 'amount', 'asc');
    const desc = sortAddressesDashboard(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeAddressesDashboardItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(addressesDashboardStatusTone('active')).toBe('success');
    expect(addressesDashboardStatusTone('pending')).toBe('warning');
    expect(addressesDashboardStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickAddressesDashboardHighlights(items, 2)).toHaveLength(2);
    expect(pickAddressesDashboardHighlights(items, 0)).toHaveLength(0);
  });
});
