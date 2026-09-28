import { describe, expect, it } from 'vitest';
import {
  buildInventorySummaryItems,
  INVENTORY_SUMMARY_ITEM_COUNT,
} from './inventory-summary.model';
import {
  describeInventorySummaryItem,
  filterInventorySummary,
  groupInventorySummaryByStatus,
  pickInventorySummaryHighlights,
  sortInventorySummary,
  totalInventorySummary,
  inventorySummaryStatusTone,
} from './inventory-summary.utils';

describe('inventory-summary utils', () => {
  const items = buildInventorySummaryItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(INVENTORY_SUMMARY_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      INVENTORY_SUMMARY_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalInventorySummary(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupInventorySummaryByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterInventorySummary(items, '')).toHaveLength(items.length);
    expect(
      filterInventorySummary(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterInventorySummary(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortInventorySummary(items, 'amount', 'asc');
    const desc = sortInventorySummary(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeInventorySummaryItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(inventorySummaryStatusTone('active')).toBe('success');
    expect(inventorySummaryStatusTone('pending')).toBe('warning');
    expect(inventorySummaryStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickInventorySummaryHighlights(items, 2)).toHaveLength(2);
    expect(pickInventorySummaryHighlights(items, 0)).toHaveLength(0);
  });
});
