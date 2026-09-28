import { describe, expect, it } from 'vitest';
import {
  buildLoyaltyEditorItems,
  LOYALTY_EDITOR_ITEM_COUNT,
} from './loyalty-editor.model';
import {
  describeLoyaltyEditorItem,
  filterLoyaltyEditor,
  groupLoyaltyEditorByStatus,
  pickLoyaltyEditorHighlights,
  sortLoyaltyEditor,
  totalLoyaltyEditor,
  loyaltyEditorStatusTone,
} from './loyalty-editor.utils';

describe('loyalty-editor utils', () => {
  const items = buildLoyaltyEditorItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(LOYALTY_EDITOR_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      LOYALTY_EDITOR_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalLoyaltyEditor(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupLoyaltyEditorByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterLoyaltyEditor(items, '')).toHaveLength(items.length);
    expect(
      filterLoyaltyEditor(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterLoyaltyEditor(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortLoyaltyEditor(items, 'amount', 'asc');
    const desc = sortLoyaltyEditor(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeLoyaltyEditorItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(loyaltyEditorStatusTone('active')).toBe('success');
    expect(loyaltyEditorStatusTone('pending')).toBe('warning');
    expect(loyaltyEditorStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickLoyaltyEditorHighlights(items, 2)).toHaveLength(2);
    expect(pickLoyaltyEditorHighlights(items, 0)).toHaveLength(0);
  });
});
