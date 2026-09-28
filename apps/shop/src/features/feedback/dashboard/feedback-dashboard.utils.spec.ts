import { describe, expect, it } from 'vitest';
import {
  buildFeedbackDashboardItems,
  FEEDBACK_DASHBOARD_ITEM_COUNT,
} from './feedback-dashboard.model';
import {
  describeFeedbackDashboardItem,
  filterFeedbackDashboard,
  groupFeedbackDashboardByStatus,
  pickFeedbackDashboardHighlights,
  sortFeedbackDashboard,
  totalFeedbackDashboard,
  feedbackDashboardStatusTone,
} from './feedback-dashboard.utils';

describe('feedback-dashboard utils', () => {
  const items = buildFeedbackDashboardItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(FEEDBACK_DASHBOARD_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      FEEDBACK_DASHBOARD_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalFeedbackDashboard(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupFeedbackDashboardByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterFeedbackDashboard(items, '')).toHaveLength(items.length);
    expect(
      filterFeedbackDashboard(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterFeedbackDashboard(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortFeedbackDashboard(items, 'amount', 'asc');
    const desc = sortFeedbackDashboard(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeFeedbackDashboardItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(feedbackDashboardStatusTone('active')).toBe('success');
    expect(feedbackDashboardStatusTone('pending')).toBe('warning');
    expect(feedbackDashboardStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickFeedbackDashboardHighlights(items, 2)).toHaveLength(2);
    expect(pickFeedbackDashboardHighlights(items, 0)).toHaveLength(0);
  });
});
