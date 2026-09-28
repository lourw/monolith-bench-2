import { describe, expect, it } from 'vitest';
import {
  buildFeedbackHistoryItems,
  FEEDBACK_HISTORY_ITEM_COUNT,
} from './feedback-history.model';
import {
  describeFeedbackHistoryItem,
  filterFeedbackHistory,
  groupFeedbackHistoryByStatus,
  pickFeedbackHistoryHighlights,
  sortFeedbackHistory,
  totalFeedbackHistory,
  feedbackHistoryStatusTone,
} from './feedback-history.utils';

describe('feedback-history utils', () => {
  const items = buildFeedbackHistoryItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(FEEDBACK_HISTORY_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      FEEDBACK_HISTORY_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalFeedbackHistory(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupFeedbackHistoryByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterFeedbackHistory(items, '')).toHaveLength(items.length);
    expect(
      filterFeedbackHistory(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterFeedbackHistory(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortFeedbackHistory(items, 'amount', 'asc');
    const desc = sortFeedbackHistory(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeFeedbackHistoryItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(feedbackHistoryStatusTone('active')).toBe('success');
    expect(feedbackHistoryStatusTone('pending')).toBe('warning');
    expect(feedbackHistoryStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickFeedbackHistoryHighlights(items, 2)).toHaveLength(2);
    expect(pickFeedbackHistoryHighlights(items, 0)).toHaveLength(0);
  });
});
