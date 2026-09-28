import { describe, expect, it } from 'vitest';
import {
  buildAuthEditorItems,
  AUTH_EDITOR_ITEM_COUNT,
} from './auth-editor.model';
import {
  describeAuthEditorItem,
  filterAuthEditor,
  groupAuthEditorByStatus,
  pickAuthEditorHighlights,
  sortAuthEditor,
  totalAuthEditor,
  authEditorStatusTone,
} from './auth-editor.utils';

describe('auth-editor utils', () => {
  const items = buildAuthEditorItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(AUTH_EDITOR_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      AUTH_EDITOR_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalAuthEditor(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupAuthEditorByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterAuthEditor(items, '')).toHaveLength(items.length);
    expect(
      filterAuthEditor(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterAuthEditor(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortAuthEditor(items, 'amount', 'asc');
    const desc = sortAuthEditor(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeAuthEditorItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(authEditorStatusTone('active')).toBe('success');
    expect(authEditorStatusTone('pending')).toBe('warning');
    expect(authEditorStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickAuthEditorHighlights(items, 2)).toHaveLength(2);
    expect(pickAuthEditorHighlights(items, 0)).toHaveLength(0);
  });
});
