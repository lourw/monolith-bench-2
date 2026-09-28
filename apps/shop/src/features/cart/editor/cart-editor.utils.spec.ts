import { describe, expect, it } from 'vitest';
import {
  buildCartEditorItems,
  CART_EDITOR_ITEM_COUNT,
} from './cart-editor.model';
import {
  describeCartEditorItem,
  filterCartEditor,
  groupCartEditorByStatus,
  pickCartEditorHighlights,
  sortCartEditor,
  totalCartEditor,
  cartEditorStatusTone,
} from './cart-editor.utils';

describe('cart-editor utils', () => {
  const items = buildCartEditorItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(CART_EDITOR_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      CART_EDITOR_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalCartEditor(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupCartEditorByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterCartEditor(items, '')).toHaveLength(items.length);
    expect(
      filterCartEditor(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterCartEditor(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortCartEditor(items, 'amount', 'asc');
    const desc = sortCartEditor(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeCartEditorItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(cartEditorStatusTone('active')).toBe('success');
    expect(cartEditorStatusTone('pending')).toBe('warning');
    expect(cartEditorStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickCartEditorHighlights(items, 2)).toHaveLength(2);
    expect(pickCartEditorHighlights(items, 0)).toHaveLength(0);
  });
});
