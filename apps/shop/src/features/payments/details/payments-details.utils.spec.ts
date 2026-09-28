import { describe, expect, it } from 'vitest';
import {
  buildPaymentsDetailsItems,
  PAYMENTS_DETAILS_ITEM_COUNT,
} from './payments-details.model';
import {
  describePaymentsDetailsItem,
  filterPaymentsDetails,
  groupPaymentsDetailsByStatus,
  pickPaymentsDetailsHighlights,
  sortPaymentsDetails,
  totalPaymentsDetails,
  paymentsDetailsStatusTone,
} from './payments-details.utils';

describe('payments-details utils', () => {
  const items = buildPaymentsDetailsItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(PAYMENTS_DETAILS_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      PAYMENTS_DETAILS_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalPaymentsDetails(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupPaymentsDetailsByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterPaymentsDetails(items, '')).toHaveLength(items.length);
    expect(
      filterPaymentsDetails(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterPaymentsDetails(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortPaymentsDetails(items, 'amount', 'asc');
    const desc = sortPaymentsDetails(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describePaymentsDetailsItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(paymentsDetailsStatusTone('active')).toBe('success');
    expect(paymentsDetailsStatusTone('pending')).toBe('warning');
    expect(paymentsDetailsStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickPaymentsDetailsHighlights(items, 2)).toHaveLength(2);
    expect(pickPaymentsDetailsHighlights(items, 0)).toHaveLength(0);
  });
});
