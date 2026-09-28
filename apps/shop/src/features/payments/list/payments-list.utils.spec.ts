import { describe, expect, it } from 'vitest';
import {
  buildPaymentsListItems,
  PAYMENTS_LIST_ITEM_COUNT,
} from './payments-list.model';
import {
  describePaymentsListItem,
  filterPaymentsList,
  groupPaymentsListByStatus,
  pickPaymentsListHighlights,
  sortPaymentsList,
  totalPaymentsList,
  paymentsListStatusTone,
} from './payments-list.utils';

describe('payments-list utils', () => {
  const items = buildPaymentsListItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(PAYMENTS_LIST_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      PAYMENTS_LIST_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalPaymentsList(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupPaymentsListByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterPaymentsList(items, '')).toHaveLength(items.length);
    expect(
      filterPaymentsList(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterPaymentsList(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortPaymentsList(items, 'amount', 'asc');
    const desc = sortPaymentsList(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describePaymentsListItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(paymentsListStatusTone('active')).toBe('success');
    expect(paymentsListStatusTone('pending')).toBe('warning');
    expect(paymentsListStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickPaymentsListHighlights(items, 2)).toHaveLength(2);
    expect(pickPaymentsListHighlights(items, 0)).toHaveLength(0);
  });
});
