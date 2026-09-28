import { describe, expect, it } from 'vitest';
import {
  buildRecommendationsEditorItems,
  RECOMMENDATIONS_EDITOR_ITEM_COUNT,
} from './recommendations-editor.model';
import {
  describeRecommendationsEditorItem,
  filterRecommendationsEditor,
  groupRecommendationsEditorByStatus,
  pickRecommendationsEditorHighlights,
  sortRecommendationsEditor,
  totalRecommendationsEditor,
  recommendationsEditorStatusTone,
} from './recommendations-editor.utils';

describe('recommendations-editor utils', () => {
  const items = buildRecommendationsEditorItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(RECOMMENDATIONS_EDITOR_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      RECOMMENDATIONS_EDITOR_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalRecommendationsEditor(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupRecommendationsEditorByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterRecommendationsEditor(items, '')).toHaveLength(items.length);
    expect(
      filterRecommendationsEditor(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(
      filterRecommendationsEditor(items, 'no-such-thing-xyz'),
    ).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortRecommendationsEditor(items, 'amount', 'asc');
    const desc = sortRecommendationsEditor(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeRecommendationsEditorItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(recommendationsEditorStatusTone('active')).toBe('success');
    expect(recommendationsEditorStatusTone('pending')).toBe('warning');
    expect(recommendationsEditorStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickRecommendationsEditorHighlights(items, 2)).toHaveLength(2);
    expect(pickRecommendationsEditorHighlights(items, 0)).toHaveLength(0);
  });
});
