import { describe, expect, it } from 'vitest';
import {
  buildInventoryEditorItems,
  INVENTORY_EDITOR_ITEM_COUNT,
} from './inventory-editor.model';
import {
  describeInventoryEditorItem,
  filterInventoryEditor,
  groupInventoryEditorByStatus,
  pickInventoryEditorHighlights,
  sortInventoryEditor,
  totalInventoryEditor,
  inventoryEditorStatusTone,
} from './inventory-editor.utils';

describe('inventory-editor utils', () => {
  const items = buildInventoryEditorItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(INVENTORY_EDITOR_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      INVENTORY_EDITOR_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalInventoryEditor(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupInventoryEditorByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterInventoryEditor(items, '')).toHaveLength(items.length);
    expect(
      filterInventoryEditor(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterInventoryEditor(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortInventoryEditor(items, 'amount', 'asc');
    const desc = sortInventoryEditor(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeInventoryEditorItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(inventoryEditorStatusTone('active')).toBe('success');
    expect(inventoryEditorStatusTone('pending')).toBe('warning');
    expect(inventoryEditorStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickInventoryEditorHighlights(items, 2)).toHaveLength(2);
    expect(pickInventoryEditorHighlights(items, 0)).toHaveLength(0);
  });
});
