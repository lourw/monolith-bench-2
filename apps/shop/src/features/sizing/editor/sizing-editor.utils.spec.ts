import { describe, expect, it } from 'vitest';
import {
  buildSizingEditorItems,
  SIZING_EDITOR_ITEM_COUNT,
} from './sizing-editor.model';
import {
  describeSizingEditorItem,
  filterSizingEditor,
  groupSizingEditorByStatus,
  pickSizingEditorHighlights,
  sortSizingEditor,
  totalSizingEditor,
  sizingEditorStatusTone,
} from './sizing-editor.utils';

describe('sizing-editor utils', () => {
  const items = buildSizingEditorItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(SIZING_EDITOR_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      SIZING_EDITOR_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalSizingEditor(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupSizingEditorByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterSizingEditor(items, '')).toHaveLength(items.length);
    expect(
      filterSizingEditor(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterSizingEditor(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortSizingEditor(items, 'amount', 'asc');
    const desc = sortSizingEditor(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeSizingEditorItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(sizingEditorStatusTone('active')).toBe('success');
    expect(sizingEditorStatusTone('pending')).toBe('warning');
    expect(sizingEditorStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickSizingEditorHighlights(items, 2)).toHaveLength(2);
    expect(pickSizingEditorHighlights(items, 0)).toHaveLength(0);
  });
});
