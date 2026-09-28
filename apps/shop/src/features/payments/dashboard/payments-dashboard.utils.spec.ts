import { describe, expect, it } from 'vitest';
import {
  buildPaymentsDashboardItems,
  PAYMENTS_DASHBOARD_ITEM_COUNT,
} from './payments-dashboard.model';
import {
  describePaymentsDashboardItem,
  filterPaymentsDashboard,
  groupPaymentsDashboardByStatus,
  pickPaymentsDashboardHighlights,
  sortPaymentsDashboard,
  totalPaymentsDashboard,
  paymentsDashboardStatusTone,
} from './payments-dashboard.utils';

describe('payments-dashboard utils', () => {
  const items = buildPaymentsDashboardItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(PAYMENTS_DASHBOARD_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      PAYMENTS_DASHBOARD_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalPaymentsDashboard(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupPaymentsDashboardByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterPaymentsDashboard(items, '')).toHaveLength(items.length);
    expect(
      filterPaymentsDashboard(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterPaymentsDashboard(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortPaymentsDashboard(items, 'amount', 'asc');
    const desc = sortPaymentsDashboard(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describePaymentsDashboardItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(paymentsDashboardStatusTone('active')).toBe('success');
    expect(paymentsDashboardStatusTone('pending')).toBe('warning');
    expect(paymentsDashboardStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickPaymentsDashboardHighlights(items, 2)).toHaveLength(2);
    expect(pickPaymentsDashboardHighlights(items, 0)).toHaveLength(0);
  });
});
