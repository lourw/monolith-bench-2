import { describe, expect, it } from 'vitest';
import {
  buildAddressesDetailsItems,
  ADDRESSES_DETAILS_ITEM_COUNT,
} from './addresses-details.model';
import {
  describeAddressesDetailsItem,
  filterAddressesDetails,
  groupAddressesDetailsByStatus,
  pickAddressesDetailsHighlights,
  sortAddressesDetails,
  totalAddressesDetails,
  addressesDetailsStatusTone,
} from './addresses-details.utils';

describe('addresses-details utils', () => {
  const items = buildAddressesDetailsItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(ADDRESSES_DETAILS_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      ADDRESSES_DETAILS_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalAddressesDetails(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupAddressesDetailsByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterAddressesDetails(items, '')).toHaveLength(items.length);
    expect(
      filterAddressesDetails(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterAddressesDetails(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortAddressesDetails(items, 'amount', 'asc');
    const desc = sortAddressesDetails(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeAddressesDetailsItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(addressesDetailsStatusTone('active')).toBe('success');
    expect(addressesDetailsStatusTone('pending')).toBe('warning');
    expect(addressesDetailsStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickAddressesDetailsHighlights(items, 2)).toHaveLength(2);
    expect(pickAddressesDetailsHighlights(items, 0)).toHaveLength(0);
  });
});
