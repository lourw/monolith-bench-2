import { describe, expect, it } from 'vitest';
import {
  buildCompareEditorItems,
  COMPARE_EDITOR_ITEM_COUNT,
} from './compare-editor.model';
import {
  describeCompareEditorItem,
  filterCompareEditor,
  groupCompareEditorByStatus,
  pickCompareEditorHighlights,
  sortCompareEditor,
  totalCompareEditor,
  compareEditorStatusTone,
} from './compare-editor.utils';

describe('compare-editor utils', () => {
  const items = buildCompareEditorItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(COMPARE_EDITOR_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      COMPARE_EDITOR_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalCompareEditor(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupCompareEditorByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterCompareEditor(items, '')).toHaveLength(items.length);
    expect(
      filterCompareEditor(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterCompareEditor(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortCompareEditor(items, 'amount', 'asc');
    const desc = sortCompareEditor(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeCompareEditorItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(compareEditorStatusTone('active')).toBe('success');
    expect(compareEditorStatusTone('pending')).toBe('warning');
    expect(compareEditorStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickCompareEditorHighlights(items, 2)).toHaveLength(2);
    expect(pickCompareEditorHighlights(items, 0)).toHaveLength(0);
  });
});
