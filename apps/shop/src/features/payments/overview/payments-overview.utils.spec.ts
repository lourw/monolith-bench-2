import { describe, expect, it } from 'vitest';
import {
  buildPaymentsOverviewItems,
  PAYMENTS_OVERVIEW_ITEM_COUNT,
} from './payments-overview.model';
import {
  describePaymentsOverviewItem,
  filterPaymentsOverview,
  groupPaymentsOverviewByStatus,
  pickPaymentsOverviewHighlights,
  sortPaymentsOverview,
  totalPaymentsOverview,
  paymentsOverviewStatusTone,
} from './payments-overview.utils';

describe('payments-overview utils', () => {
  const items = buildPaymentsOverviewItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(PAYMENTS_OVERVIEW_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      PAYMENTS_OVERVIEW_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalPaymentsOverview(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupPaymentsOverviewByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterPaymentsOverview(items, '')).toHaveLength(items.length);
    expect(
      filterPaymentsOverview(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterPaymentsOverview(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortPaymentsOverview(items, 'amount', 'asc');
    const desc = sortPaymentsOverview(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describePaymentsOverviewItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(paymentsOverviewStatusTone('active')).toBe('success');
    expect(paymentsOverviewStatusTone('pending')).toBe('warning');
    expect(paymentsOverviewStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickPaymentsOverviewHighlights(items, 2)).toHaveLength(2);
    expect(pickPaymentsOverviewHighlights(items, 0)).toHaveLength(0);
  });
});
