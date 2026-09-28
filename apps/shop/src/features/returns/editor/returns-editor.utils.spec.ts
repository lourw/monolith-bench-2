import { describe, expect, it } from 'vitest';
import {
  buildReturnsEditorItems,
  RETURNS_EDITOR_ITEM_COUNT,
} from './returns-editor.model';
import {
  describeReturnsEditorItem,
  filterReturnsEditor,
  groupReturnsEditorByStatus,
  pickReturnsEditorHighlights,
  sortReturnsEditor,
  totalReturnsEditor,
  returnsEditorStatusTone,
} from './returns-editor.utils';

describe('returns-editor utils', () => {
  const items = buildReturnsEditorItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(RETURNS_EDITOR_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      RETURNS_EDITOR_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalReturnsEditor(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupReturnsEditorByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterReturnsEditor(items, '')).toHaveLength(items.length);
    expect(
      filterReturnsEditor(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterReturnsEditor(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortReturnsEditor(items, 'amount', 'asc');
    const desc = sortReturnsEditor(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeReturnsEditorItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(returnsEditorStatusTone('active')).toBe('success');
    expect(returnsEditorStatusTone('pending')).toBe('warning');
    expect(returnsEditorStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickReturnsEditorHighlights(items, 2)).toHaveLength(2);
    expect(pickReturnsEditorHighlights(items, 0)).toHaveLength(0);
  });
});
