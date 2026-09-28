import { describe, expect, it } from 'vitest';
import {
  buildInventoryListItems,
  INVENTORY_LIST_ITEM_COUNT,
} from './inventory-list.model';
import {
  describeInventoryListItem,
  filterInventoryList,
  groupInventoryListByStatus,
  pickInventoryListHighlights,
  sortInventoryList,
  totalInventoryList,
  inventoryListStatusTone,
} from './inventory-list.utils';

describe('inventory-list utils', () => {
  const items = buildInventoryListItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(INVENTORY_LIST_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      INVENTORY_LIST_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalInventoryList(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupInventoryListByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterInventoryList(items, '')).toHaveLength(items.length);
    expect(
      filterInventoryList(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterInventoryList(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortInventoryList(items, 'amount', 'asc');
    const desc = sortInventoryList(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeInventoryListItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(inventoryListStatusTone('active')).toBe('success');
    expect(inventoryListStatusTone('pending')).toBe('warning');
    expect(inventoryListStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickInventoryListHighlights(items, 2)).toHaveLength(2);
    expect(pickInventoryListHighlights(items, 0)).toHaveLength(0);
  });
});
