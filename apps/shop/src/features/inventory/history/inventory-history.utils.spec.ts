import { describe, expect, it } from 'vitest';
import {
  buildInventoryHistoryItems,
  INVENTORY_HISTORY_ITEM_COUNT,
} from './inventory-history.model';
import {
  describeInventoryHistoryItem,
  filterInventoryHistory,
  groupInventoryHistoryByStatus,
  pickInventoryHistoryHighlights,
  sortInventoryHistory,
  totalInventoryHistory,
  inventoryHistoryStatusTone,
} from './inventory-history.utils';

describe('inventory-history utils', () => {
  const items = buildInventoryHistoryItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(INVENTORY_HISTORY_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      INVENTORY_HISTORY_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalInventoryHistory(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupInventoryHistoryByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterInventoryHistory(items, '')).toHaveLength(items.length);
    expect(
      filterInventoryHistory(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterInventoryHistory(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortInventoryHistory(items, 'amount', 'asc');
    const desc = sortInventoryHistory(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeInventoryHistoryItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(inventoryHistoryStatusTone('active')).toBe('success');
    expect(inventoryHistoryStatusTone('pending')).toBe('warning');
    expect(inventoryHistoryStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickInventoryHistoryHighlights(items, 2)).toHaveLength(2);
    expect(pickInventoryHistoryHighlights(items, 0)).toHaveLength(0);
  });
});
