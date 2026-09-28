import { describe, expect, it } from 'vitest';
import {
  buildWishlistEditorItems,
  WISHLIST_EDITOR_ITEM_COUNT,
} from './wishlist-editor.model';
import {
  describeWishlistEditorItem,
  filterWishlistEditor,
  groupWishlistEditorByStatus,
  pickWishlistEditorHighlights,
  sortWishlistEditor,
  totalWishlistEditor,
  wishlistEditorStatusTone,
} from './wishlist-editor.utils';

describe('wishlist-editor utils', () => {
  const items = buildWishlistEditorItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(WISHLIST_EDITOR_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      WISHLIST_EDITOR_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalWishlistEditor(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupWishlistEditorByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterWishlistEditor(items, '')).toHaveLength(items.length);
    expect(
      filterWishlistEditor(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterWishlistEditor(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortWishlistEditor(items, 'amount', 'asc');
    const desc = sortWishlistEditor(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeWishlistEditorItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(wishlistEditorStatusTone('active')).toBe('success');
    expect(wishlistEditorStatusTone('pending')).toBe('warning');
    expect(wishlistEditorStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickWishlistEditorHighlights(items, 2)).toHaveLength(2);
    expect(pickWishlistEditorHighlights(items, 0)).toHaveLength(0);
  });
});
