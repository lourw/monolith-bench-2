import { describe, expect, it } from 'vitest';
import {
  buildPaymentsHistoryItems,
  PAYMENTS_HISTORY_ITEM_COUNT,
} from './payments-history.model';
import {
  describePaymentsHistoryItem,
  filterPaymentsHistory,
  groupPaymentsHistoryByStatus,
  pickPaymentsHistoryHighlights,
  sortPaymentsHistory,
  totalPaymentsHistory,
  paymentsHistoryStatusTone,
} from './payments-history.utils';

describe('payments-history utils', () => {
  const items = buildPaymentsHistoryItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(PAYMENTS_HISTORY_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      PAYMENTS_HISTORY_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalPaymentsHistory(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupPaymentsHistoryByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterPaymentsHistory(items, '')).toHaveLength(items.length);
    expect(
      filterPaymentsHistory(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterPaymentsHistory(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortPaymentsHistory(items, 'amount', 'asc');
    const desc = sortPaymentsHistory(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describePaymentsHistoryItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(paymentsHistoryStatusTone('active')).toBe('success');
    expect(paymentsHistoryStatusTone('pending')).toBe('warning');
    expect(paymentsHistoryStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickPaymentsHistoryHighlights(items, 2)).toHaveLength(2);
    expect(pickPaymentsHistoryHighlights(items, 0)).toHaveLength(0);
  });
});
