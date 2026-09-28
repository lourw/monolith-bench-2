import { describe, expect, it } from 'vitest';
import {
  buildShippingEditorItems,
  SHIPPING_EDITOR_ITEM_COUNT,
} from './shipping-editor.model';
import {
  describeShippingEditorItem,
  filterShippingEditor,
  groupShippingEditorByStatus,
  pickShippingEditorHighlights,
  sortShippingEditor,
  totalShippingEditor,
  shippingEditorStatusTone,
} from './shipping-editor.utils';

describe('shipping-editor utils', () => {
  const items = buildShippingEditorItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(SHIPPING_EDITOR_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      SHIPPING_EDITOR_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalShippingEditor(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupShippingEditorByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterShippingEditor(items, '')).toHaveLength(items.length);
    expect(
      filterShippingEditor(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterShippingEditor(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortShippingEditor(items, 'amount', 'asc');
    const desc = sortShippingEditor(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeShippingEditorItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(shippingEditorStatusTone('active')).toBe('success');
    expect(shippingEditorStatusTone('pending')).toBe('warning');
    expect(shippingEditorStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickShippingEditorHighlights(items, 2)).toHaveLength(2);
    expect(pickShippingEditorHighlights(items, 0)).toHaveLength(0);
  });
});
