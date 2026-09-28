import { describe, expect, it } from 'vitest';
import {
  buildReviewsEditorItems,
  REVIEWS_EDITOR_ITEM_COUNT,
} from './reviews-editor.model';
import {
  describeReviewsEditorItem,
  filterReviewsEditor,
  groupReviewsEditorByStatus,
  pickReviewsEditorHighlights,
  sortReviewsEditor,
  totalReviewsEditor,
  reviewsEditorStatusTone,
} from './reviews-editor.utils';

describe('reviews-editor utils', () => {
  const items = buildReviewsEditorItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(REVIEWS_EDITOR_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      REVIEWS_EDITOR_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalReviewsEditor(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupReviewsEditorByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterReviewsEditor(items, '')).toHaveLength(items.length);
    expect(
      filterReviewsEditor(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterReviewsEditor(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortReviewsEditor(items, 'amount', 'asc');
    const desc = sortReviewsEditor(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeReviewsEditorItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(reviewsEditorStatusTone('active')).toBe('success');
    expect(reviewsEditorStatusTone('pending')).toBe('warning');
    expect(reviewsEditorStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickReviewsEditorHighlights(items, 2)).toHaveLength(2);
    expect(pickReviewsEditorHighlights(items, 0)).toHaveLength(0);
  });
});
