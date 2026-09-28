import { describe, expect, it } from 'vitest';
import {
  buildSearchEditorItems,
  SEARCH_EDITOR_ITEM_COUNT,
} from './search-editor.model';
import {
  describeSearchEditorItem,
  filterSearchEditor,
  groupSearchEditorByStatus,
  pickSearchEditorHighlights,
  sortSearchEditor,
  totalSearchEditor,
  searchEditorStatusTone,
} from './search-editor.utils';

describe('search-editor utils', () => {
  const items = buildSearchEditorItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(SEARCH_EDITOR_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      SEARCH_EDITOR_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalSearchEditor(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupSearchEditorByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterSearchEditor(items, '')).toHaveLength(items.length);
    expect(
      filterSearchEditor(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterSearchEditor(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortSearchEditor(items, 'amount', 'asc');
    const desc = sortSearchEditor(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeSearchEditorItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(searchEditorStatusTone('active')).toBe('success');
    expect(searchEditorStatusTone('pending')).toBe('warning');
    expect(searchEditorStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickSearchEditorHighlights(items, 2)).toHaveLength(2);
    expect(pickSearchEditorHighlights(items, 0)).toHaveLength(0);
  });
});
