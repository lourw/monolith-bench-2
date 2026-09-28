import { describe, expect, it } from 'vitest';
import {
  buildShippingSummaryItems,
  SHIPPING_SUMMARY_ITEM_COUNT,
} from './shipping-summary.model';
import {
  describeShippingSummaryItem,
  filterShippingSummary,
  groupShippingSummaryByStatus,
  pickShippingSummaryHighlights,
  sortShippingSummary,
  totalShippingSummary,
  shippingSummaryStatusTone,
} from './shipping-summary.utils';

describe('shipping-summary utils', () => {
  const items = buildShippingSummaryItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(SHIPPING_SUMMARY_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      SHIPPING_SUMMARY_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalShippingSummary(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupShippingSummaryByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterShippingSummary(items, '')).toHaveLength(items.length);
    expect(
      filterShippingSummary(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterShippingSummary(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortShippingSummary(items, 'amount', 'asc');
    const desc = sortShippingSummary(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeShippingSummaryItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(shippingSummaryStatusTone('active')).toBe('success');
    expect(shippingSummaryStatusTone('pending')).toBe('warning');
    expect(shippingSummaryStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickShippingSummaryHighlights(items, 2)).toHaveLength(2);
    expect(pickShippingSummaryHighlights(items, 0)).toHaveLength(0);
  });
});
