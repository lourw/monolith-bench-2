import { describe, expect, it } from 'vitest';
import {
  buildStoreLocatorEditorItems,
  STORE_LOCATOR_EDITOR_ITEM_COUNT,
} from './store-locator-editor.model';
import {
  describeStoreLocatorEditorItem,
  filterStoreLocatorEditor,
  groupStoreLocatorEditorByStatus,
  pickStoreLocatorEditorHighlights,
  sortStoreLocatorEditor,
  totalStoreLocatorEditor,
  storeLocatorEditorStatusTone,
} from './store-locator-editor.utils';

describe('store-locator-editor utils', () => {
  const items = buildStoreLocatorEditorItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(STORE_LOCATOR_EDITOR_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      STORE_LOCATOR_EDITOR_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalStoreLocatorEditor(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupStoreLocatorEditorByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterStoreLocatorEditor(items, '')).toHaveLength(items.length);
    expect(
      filterStoreLocatorEditor(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterStoreLocatorEditor(items, 'no-such-thing-xyz')).toHaveLength(
      0,
    );
  });

  it('sorts by key in both directions', () => {
    const asc = sortStoreLocatorEditor(items, 'amount', 'asc');
    const desc = sortStoreLocatorEditor(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeStoreLocatorEditorItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(storeLocatorEditorStatusTone('active')).toBe('success');
    expect(storeLocatorEditorStatusTone('pending')).toBe('warning');
    expect(storeLocatorEditorStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickStoreLocatorEditorHighlights(items, 2)).toHaveLength(2);
    expect(pickStoreLocatorEditorHighlights(items, 0)).toHaveLength(0);
  });
});
