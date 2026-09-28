import { describe, expect, it } from 'vitest';
import {
  buildFeedbackOverviewItems,
  FEEDBACK_OVERVIEW_ITEM_COUNT,
} from './feedback-overview.model';
import {
  describeFeedbackOverviewItem,
  filterFeedbackOverview,
  groupFeedbackOverviewByStatus,
  pickFeedbackOverviewHighlights,
  sortFeedbackOverview,
  totalFeedbackOverview,
  feedbackOverviewStatusTone,
} from './feedback-overview.utils';

describe('feedback-overview utils', () => {
  const items = buildFeedbackOverviewItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(FEEDBACK_OVERVIEW_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      FEEDBACK_OVERVIEW_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalFeedbackOverview(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupFeedbackOverviewByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterFeedbackOverview(items, '')).toHaveLength(items.length);
    expect(
      filterFeedbackOverview(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterFeedbackOverview(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortFeedbackOverview(items, 'amount', 'asc');
    const desc = sortFeedbackOverview(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeFeedbackOverviewItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(feedbackOverviewStatusTone('active')).toBe('success');
    expect(feedbackOverviewStatusTone('pending')).toBe('warning');
    expect(feedbackOverviewStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickFeedbackOverviewHighlights(items, 2)).toHaveLength(2);
    expect(pickFeedbackOverviewHighlights(items, 0)).toHaveLength(0);
  });
});
