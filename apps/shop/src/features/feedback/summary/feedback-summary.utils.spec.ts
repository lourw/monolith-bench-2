import { describe, expect, it } from 'vitest';
import {
  buildFeedbackSummaryItems,
  FEEDBACK_SUMMARY_ITEM_COUNT,
} from './feedback-summary.model';
import {
  describeFeedbackSummaryItem,
  filterFeedbackSummary,
  groupFeedbackSummaryByStatus,
  pickFeedbackSummaryHighlights,
  sortFeedbackSummary,
  totalFeedbackSummary,
  feedbackSummaryStatusTone,
} from './feedback-summary.utils';

describe('feedback-summary utils', () => {
  const items = buildFeedbackSummaryItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(FEEDBACK_SUMMARY_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      FEEDBACK_SUMMARY_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalFeedbackSummary(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupFeedbackSummaryByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterFeedbackSummary(items, '')).toHaveLength(items.length);
    expect(
      filterFeedbackSummary(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterFeedbackSummary(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortFeedbackSummary(items, 'amount', 'asc');
    const desc = sortFeedbackSummary(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeFeedbackSummaryItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(feedbackSummaryStatusTone('active')).toBe('success');
    expect(feedbackSummaryStatusTone('pending')).toBe('warning');
    expect(feedbackSummaryStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickFeedbackSummaryHighlights(items, 2)).toHaveLength(2);
    expect(pickFeedbackSummaryHighlights(items, 0)).toHaveLength(0);
  });
});
