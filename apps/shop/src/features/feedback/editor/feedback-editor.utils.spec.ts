import { describe, expect, it } from 'vitest';
import {
  buildFeedbackEditorItems,
  FEEDBACK_EDITOR_ITEM_COUNT,
} from './feedback-editor.model';
import {
  describeFeedbackEditorItem,
  filterFeedbackEditor,
  groupFeedbackEditorByStatus,
  pickFeedbackEditorHighlights,
  sortFeedbackEditor,
  totalFeedbackEditor,
  feedbackEditorStatusTone,
} from './feedback-editor.utils';

describe('feedback-editor utils', () => {
  const items = buildFeedbackEditorItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(FEEDBACK_EDITOR_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      FEEDBACK_EDITOR_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalFeedbackEditor(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupFeedbackEditorByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterFeedbackEditor(items, '')).toHaveLength(items.length);
    expect(
      filterFeedbackEditor(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterFeedbackEditor(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortFeedbackEditor(items, 'amount', 'asc');
    const desc = sortFeedbackEditor(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeFeedbackEditorItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(feedbackEditorStatusTone('active')).toBe('success');
    expect(feedbackEditorStatusTone('pending')).toBe('warning');
    expect(feedbackEditorStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickFeedbackEditorHighlights(items, 2)).toHaveLength(2);
    expect(pickFeedbackEditorHighlights(items, 0)).toHaveLength(0);
  });
});
