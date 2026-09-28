import { describe, expect, it } from 'vitest';
import {
  buildAddressesListItems,
  ADDRESSES_LIST_ITEM_COUNT,
} from './addresses-list.model';
import {
  describeAddressesListItem,
  filterAddressesList,
  groupAddressesListByStatus,
  pickAddressesListHighlights,
  sortAddressesList,
  totalAddressesList,
  addressesListStatusTone,
} from './addresses-list.utils';

describe('addresses-list utils', () => {
  const items = buildAddressesListItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(ADDRESSES_LIST_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      ADDRESSES_LIST_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalAddressesList(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupAddressesListByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterAddressesList(items, '')).toHaveLength(items.length);
    expect(
      filterAddressesList(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterAddressesList(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortAddressesList(items, 'amount', 'asc');
    const desc = sortAddressesList(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeAddressesListItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(addressesListStatusTone('active')).toBe('success');
    expect(addressesListStatusTone('pending')).toBe('warning');
    expect(addressesListStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickAddressesListHighlights(items, 2)).toHaveLength(2);
    expect(pickAddressesListHighlights(items, 0)).toHaveLength(0);
  });
});
