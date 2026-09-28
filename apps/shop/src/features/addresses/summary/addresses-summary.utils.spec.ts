import { describe, expect, it } from 'vitest';
import {
  buildAddressesSummaryItems,
  ADDRESSES_SUMMARY_ITEM_COUNT,
} from './addresses-summary.model';
import {
  describeAddressesSummaryItem,
  filterAddressesSummary,
  groupAddressesSummaryByStatus,
  pickAddressesSummaryHighlights,
  sortAddressesSummary,
  totalAddressesSummary,
  addressesSummaryStatusTone,
} from './addresses-summary.utils';

describe('addresses-summary utils', () => {
  const items = buildAddressesSummaryItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(ADDRESSES_SUMMARY_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      ADDRESSES_SUMMARY_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalAddressesSummary(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupAddressesSummaryByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterAddressesSummary(items, '')).toHaveLength(items.length);
    expect(
      filterAddressesSummary(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterAddressesSummary(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortAddressesSummary(items, 'amount', 'asc');
    const desc = sortAddressesSummary(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeAddressesSummaryItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(addressesSummaryStatusTone('active')).toBe('success');
    expect(addressesSummaryStatusTone('pending')).toBe('warning');
    expect(addressesSummaryStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickAddressesSummaryHighlights(items, 2)).toHaveLength(2);
    expect(pickAddressesSummaryHighlights(items, 0)).toHaveLength(0);
  });
});
