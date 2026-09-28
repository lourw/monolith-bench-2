import { describe, expect, it } from 'vitest';
import {
  buildBundlesEditorItems,
  BUNDLES_EDITOR_ITEM_COUNT,
} from './bundles-editor.model';
import {
  describeBundlesEditorItem,
  filterBundlesEditor,
  groupBundlesEditorByStatus,
  pickBundlesEditorHighlights,
  sortBundlesEditor,
  totalBundlesEditor,
  bundlesEditorStatusTone,
} from './bundles-editor.utils';

describe('bundles-editor utils', () => {
  const items = buildBundlesEditorItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(BUNDLES_EDITOR_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      BUNDLES_EDITOR_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalBundlesEditor(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupBundlesEditorByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterBundlesEditor(items, '')).toHaveLength(items.length);
    expect(
      filterBundlesEditor(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterBundlesEditor(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortBundlesEditor(items, 'amount', 'asc');
    const desc = sortBundlesEditor(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeBundlesEditorItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(bundlesEditorStatusTone('active')).toBe('success');
    expect(bundlesEditorStatusTone('pending')).toBe('warning');
    expect(bundlesEditorStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickBundlesEditorHighlights(items, 2)).toHaveLength(2);
    expect(pickBundlesEditorHighlights(items, 0)).toHaveLength(0);
  });
});
