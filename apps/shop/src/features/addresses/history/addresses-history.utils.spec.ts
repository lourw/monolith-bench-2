import { describe, expect, it } from 'vitest';
import {
  buildAddressesHistoryItems,
  ADDRESSES_HISTORY_ITEM_COUNT,
} from './addresses-history.model';
import {
  describeAddressesHistoryItem,
  filterAddressesHistory,
  groupAddressesHistoryByStatus,
  pickAddressesHistoryHighlights,
  sortAddressesHistory,
  totalAddressesHistory,
  addressesHistoryStatusTone,
} from './addresses-history.utils';

describe('addresses-history utils', () => {
  const items = buildAddressesHistoryItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(ADDRESSES_HISTORY_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      ADDRESSES_HISTORY_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalAddressesHistory(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupAddressesHistoryByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterAddressesHistory(items, '')).toHaveLength(items.length);
    expect(
      filterAddressesHistory(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterAddressesHistory(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortAddressesHistory(items, 'amount', 'asc');
    const desc = sortAddressesHistory(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeAddressesHistoryItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(addressesHistoryStatusTone('active')).toBe('success');
    expect(addressesHistoryStatusTone('pending')).toBe('warning');
    expect(addressesHistoryStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickAddressesHistoryHighlights(items, 2)).toHaveLength(2);
    expect(pickAddressesHistoryHighlights(items, 0)).toHaveLength(0);
  });
});
