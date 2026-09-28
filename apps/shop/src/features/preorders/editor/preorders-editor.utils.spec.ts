import { describe, expect, it } from 'vitest';
import {
  buildPreordersEditorItems,
  PREORDERS_EDITOR_ITEM_COUNT,
} from './preorders-editor.model';
import {
  describePreordersEditorItem,
  filterPreordersEditor,
  groupPreordersEditorByStatus,
  pickPreordersEditorHighlights,
  sortPreordersEditor,
  totalPreordersEditor,
  preordersEditorStatusTone,
} from './preorders-editor.utils';

describe('preorders-editor utils', () => {
  const items = buildPreordersEditorItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(PREORDERS_EDITOR_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      PREORDERS_EDITOR_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalPreordersEditor(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupPreordersEditorByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterPreordersEditor(items, '')).toHaveLength(items.length);
    expect(
      filterPreordersEditor(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterPreordersEditor(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortPreordersEditor(items, 'amount', 'asc');
    const desc = sortPreordersEditor(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describePreordersEditorItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(preordersEditorStatusTone('active')).toBe('success');
    expect(preordersEditorStatusTone('pending')).toBe('warning');
    expect(preordersEditorStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickPreordersEditorHighlights(items, 2)).toHaveLength(2);
    expect(pickPreordersEditorHighlights(items, 0)).toHaveLength(0);
  });
});
