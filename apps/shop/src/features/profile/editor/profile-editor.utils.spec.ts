import { describe, expect, it } from 'vitest';
import {
  buildProfileEditorItems,
  PROFILE_EDITOR_ITEM_COUNT,
} from './profile-editor.model';
import {
  describeProfileEditorItem,
  filterProfileEditor,
  groupProfileEditorByStatus,
  pickProfileEditorHighlights,
  sortProfileEditor,
  totalProfileEditor,
  profileEditorStatusTone,
} from './profile-editor.utils';

describe('profile-editor utils', () => {
  const items = buildProfileEditorItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(PROFILE_EDITOR_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      PROFILE_EDITOR_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalProfileEditor(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupProfileEditorByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterProfileEditor(items, '')).toHaveLength(items.length);
    expect(
      filterProfileEditor(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterProfileEditor(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortProfileEditor(items, 'amount', 'asc');
    const desc = sortProfileEditor(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeProfileEditorItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(profileEditorStatusTone('active')).toBe('success');
    expect(profileEditorStatusTone('pending')).toBe('warning');
    expect(profileEditorStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickProfileEditorHighlights(items, 2)).toHaveLength(2);
    expect(pickProfileEditorHighlights(items, 0)).toHaveLength(0);
  });
});
