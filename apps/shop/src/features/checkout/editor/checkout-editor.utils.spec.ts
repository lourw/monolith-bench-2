import { describe, expect, it } from 'vitest';
import {
  buildCheckoutEditorItems,
  CHECKOUT_EDITOR_ITEM_COUNT,
} from './checkout-editor.model';
import {
  describeCheckoutEditorItem,
  filterCheckoutEditor,
  groupCheckoutEditorByStatus,
  pickCheckoutEditorHighlights,
  sortCheckoutEditor,
  totalCheckoutEditor,
  checkoutEditorStatusTone,
} from './checkout-editor.utils';

describe('checkout-editor utils', () => {
  const items = buildCheckoutEditorItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(CHECKOUT_EDITOR_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      CHECKOUT_EDITOR_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalCheckoutEditor(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupCheckoutEditorByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterCheckoutEditor(items, '')).toHaveLength(items.length);
    expect(
      filterCheckoutEditor(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterCheckoutEditor(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortCheckoutEditor(items, 'amount', 'asc');
    const desc = sortCheckoutEditor(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeCheckoutEditorItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(checkoutEditorStatusTone('active')).toBe('success');
    expect(checkoutEditorStatusTone('pending')).toBe('warning');
    expect(checkoutEditorStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickCheckoutEditorHighlights(items, 2)).toHaveLength(2);
    expect(pickCheckoutEditorHighlights(items, 0)).toHaveLength(0);
  });
});
