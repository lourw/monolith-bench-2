import { describe, expect, it } from 'vitest';
import {
  buildFeedbackInsightsItems,
  FEEDBACK_INSIGHTS_ITEM_COUNT,
} from './feedback-insights.model';
import {
  describeFeedbackInsightsItem,
  filterFeedbackInsights,
  groupFeedbackInsightsByStatus,
  pickFeedbackInsightsHighlights,
  sortFeedbackInsights,
  totalFeedbackInsights,
  feedbackInsightsStatusTone,
} from './feedback-insights.utils';

describe('feedback-insights utils', () => {
  const items = buildFeedbackInsightsItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(FEEDBACK_INSIGHTS_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      FEEDBACK_INSIGHTS_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalFeedbackInsights(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupFeedbackInsightsByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterFeedbackInsights(items, '')).toHaveLength(items.length);
    expect(
      filterFeedbackInsights(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterFeedbackInsights(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortFeedbackInsights(items, 'amount', 'asc');
    const desc = sortFeedbackInsights(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeFeedbackInsightsItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(feedbackInsightsStatusTone('active')).toBe('success');
    expect(feedbackInsightsStatusTone('pending')).toBe('warning');
    expect(feedbackInsightsStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickFeedbackInsightsHighlights(items, 2)).toHaveLength(2);
    expect(pickFeedbackInsightsHighlights(items, 0)).toHaveLength(0);
  });
});
