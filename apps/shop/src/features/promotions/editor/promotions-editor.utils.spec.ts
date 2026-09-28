import { describe, expect, it } from 'vitest';
import {
  buildPromotionsEditorItems,
  PROMOTIONS_EDITOR_ITEM_COUNT,
} from './promotions-editor.model';
import {
  describePromotionsEditorItem,
  filterPromotionsEditor,
  groupPromotionsEditorByStatus,
  pickPromotionsEditorHighlights,
  sortPromotionsEditor,
  totalPromotionsEditor,
  promotionsEditorStatusTone,
} from './promotions-editor.utils';

describe('promotions-editor utils', () => {
  const items = buildPromotionsEditorItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(PROMOTIONS_EDITOR_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      PROMOTIONS_EDITOR_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalPromotionsEditor(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupPromotionsEditorByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterPromotionsEditor(items, '')).toHaveLength(items.length);
    expect(
      filterPromotionsEditor(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterPromotionsEditor(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortPromotionsEditor(items, 'amount', 'asc');
    const desc = sortPromotionsEditor(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describePromotionsEditorItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(promotionsEditorStatusTone('active')).toBe('success');
    expect(promotionsEditorStatusTone('pending')).toBe('warning');
    expect(promotionsEditorStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickPromotionsEditorHighlights(items, 2)).toHaveLength(2);
    expect(pickPromotionsEditorHighlights(items, 0)).toHaveLength(0);
  });
});
