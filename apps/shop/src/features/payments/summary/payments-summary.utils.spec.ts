import { describe, expect, it } from 'vitest';
import {
  buildPaymentsSummaryItems,
  PAYMENTS_SUMMARY_ITEM_COUNT,
} from './payments-summary.model';
import {
  describePaymentsSummaryItem,
  filterPaymentsSummary,
  groupPaymentsSummaryByStatus,
  pickPaymentsSummaryHighlights,
  sortPaymentsSummary,
  totalPaymentsSummary,
  paymentsSummaryStatusTone,
} from './payments-summary.utils';

describe('payments-summary utils', () => {
  const items = buildPaymentsSummaryItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(PAYMENTS_SUMMARY_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      PAYMENTS_SUMMARY_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalPaymentsSummary(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupPaymentsSummaryByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterPaymentsSummary(items, '')).toHaveLength(items.length);
    expect(
      filterPaymentsSummary(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterPaymentsSummary(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortPaymentsSummary(items, 'amount', 'asc');
    const desc = sortPaymentsSummary(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describePaymentsSummaryItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(paymentsSummaryStatusTone('active')).toBe('success');
    expect(paymentsSummaryStatusTone('pending')).toBe('warning');
    expect(paymentsSummaryStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickPaymentsSummaryHighlights(items, 2)).toHaveLength(2);
    expect(pickPaymentsSummaryHighlights(items, 0)).toHaveLength(0);
  });
});
