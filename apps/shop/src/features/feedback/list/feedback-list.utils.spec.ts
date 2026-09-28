import { describe, expect, it } from 'vitest';
import {
  buildFeedbackListItems,
  FEEDBACK_LIST_ITEM_COUNT,
} from './feedback-list.model';
import {
  describeFeedbackListItem,
  filterFeedbackList,
  groupFeedbackListByStatus,
  pickFeedbackListHighlights,
  sortFeedbackList,
  totalFeedbackList,
  feedbackListStatusTone,
} from './feedback-list.utils';

describe('feedback-list utils', () => {
  const items = buildFeedbackListItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(FEEDBACK_LIST_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      FEEDBACK_LIST_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalFeedbackList(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupFeedbackListByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterFeedbackList(items, '')).toHaveLength(items.length);
    expect(
      filterFeedbackList(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterFeedbackList(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortFeedbackList(items, 'amount', 'asc');
    const desc = sortFeedbackList(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeFeedbackListItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(feedbackListStatusTone('active')).toBe('success');
    expect(feedbackListStatusTone('pending')).toBe('warning');
    expect(feedbackListStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickFeedbackListHighlights(items, 2)).toHaveLength(2);
    expect(pickFeedbackListHighlights(items, 0)).toHaveLength(0);
  });
});
