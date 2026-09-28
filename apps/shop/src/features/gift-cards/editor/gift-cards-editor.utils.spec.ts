import { describe, expect, it } from 'vitest';
import {
  buildGiftCardsEditorItems,
  GIFT_CARDS_EDITOR_ITEM_COUNT,
} from './gift-cards-editor.model';
import {
  describeGiftCardsEditorItem,
  filterGiftCardsEditor,
  groupGiftCardsEditorByStatus,
  pickGiftCardsEditorHighlights,
  sortGiftCardsEditor,
  totalGiftCardsEditor,
  giftCardsEditorStatusTone,
} from './gift-cards-editor.utils';

describe('gift-cards-editor utils', () => {
  const items = buildGiftCardsEditorItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(GIFT_CARDS_EDITOR_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      GIFT_CARDS_EDITOR_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalGiftCardsEditor(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupGiftCardsEditorByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterGiftCardsEditor(items, '')).toHaveLength(items.length);
    expect(
      filterGiftCardsEditor(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterGiftCardsEditor(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortGiftCardsEditor(items, 'amount', 'asc');
    const desc = sortGiftCardsEditor(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeGiftCardsEditorItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(giftCardsEditorStatusTone('active')).toBe('success');
    expect(giftCardsEditorStatusTone('pending')).toBe('warning');
    expect(giftCardsEditorStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickGiftCardsEditorHighlights(items, 2)).toHaveLength(2);
    expect(pickGiftCardsEditorHighlights(items, 0)).toHaveLength(0);
  });
});
