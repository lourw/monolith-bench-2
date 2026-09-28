import { describe, expect, it } from 'vitest';
import {
  buildInventoryDetailsItems,
  INVENTORY_DETAILS_ITEM_COUNT,
} from './inventory-details.model';
import {
  describeInventoryDetailsItem,
  filterInventoryDetails,
  groupInventoryDetailsByStatus,
  pickInventoryDetailsHighlights,
  sortInventoryDetails,
  totalInventoryDetails,
  inventoryDetailsStatusTone,
} from './inventory-details.utils';

describe('inventory-details utils', () => {
  const items = buildInventoryDetailsItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(INVENTORY_DETAILS_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      INVENTORY_DETAILS_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalInventoryDetails(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupInventoryDetailsByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterInventoryDetails(items, '')).toHaveLength(items.length);
    expect(
      filterInventoryDetails(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterInventoryDetails(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortInventoryDetails(items, 'amount', 'asc');
    const desc = sortInventoryDetails(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeInventoryDetailsItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(inventoryDetailsStatusTone('active')).toBe('success');
    expect(inventoryDetailsStatusTone('pending')).toBe('warning');
    expect(inventoryDetailsStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickInventoryDetailsHighlights(items, 2)).toHaveLength(2);
    expect(pickInventoryDetailsHighlights(items, 0)).toHaveLength(0);
  });
});
