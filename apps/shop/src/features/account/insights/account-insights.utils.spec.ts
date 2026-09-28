import { describe, expect, it } from 'vitest';
import {
  buildAccountInsightsItems,
  ACCOUNT_INSIGHTS_ITEM_COUNT,
} from './account-insights.model';
import {
  describeAccountInsightsItem,
  filterAccountInsights,
  groupAccountInsightsByStatus,
  pickAccountInsightsHighlights,
  sortAccountInsights,
  totalAccountInsights,
  accountInsightsStatusTone,
} from './account-insights.utils';

describe('account-insights utils', () => {
  const items = buildAccountInsightsItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(ACCOUNT_INSIGHTS_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      ACCOUNT_INSIGHTS_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalAccountInsights(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupAccountInsightsByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterAccountInsights(items, '')).toHaveLength(items.length);
    expect(
      filterAccountInsights(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterAccountInsights(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortAccountInsights(items, 'amount', 'asc');
    const desc = sortAccountInsights(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeAccountInsightsItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(accountInsightsStatusTone('active')).toBe('success');
    expect(accountInsightsStatusTone('pending')).toBe('warning');
    expect(accountInsightsStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickAccountInsightsHighlights(items, 2)).toHaveLength(2);
    expect(pickAccountInsightsHighlights(items, 0)).toHaveLength(0);
  });
});
