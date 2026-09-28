import { describe, expect, it } from 'vitest';
import {
  buildAuthInsightsItems,
  AUTH_INSIGHTS_ITEM_COUNT,
} from './auth-insights.model';
import {
  describeAuthInsightsItem,
  filterAuthInsights,
  groupAuthInsightsByStatus,
  pickAuthInsightsHighlights,
  sortAuthInsights,
  totalAuthInsights,
  authInsightsStatusTone,
} from './auth-insights.utils';

describe('auth-insights utils', () => {
  const items = buildAuthInsightsItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(AUTH_INSIGHTS_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      AUTH_INSIGHTS_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalAuthInsights(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupAuthInsightsByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterAuthInsights(items, '')).toHaveLength(items.length);
    expect(
      filterAuthInsights(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterAuthInsights(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortAuthInsights(items, 'amount', 'asc');
    const desc = sortAuthInsights(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeAuthInsightsItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(authInsightsStatusTone('active')).toBe('success');
    expect(authInsightsStatusTone('pending')).toBe('warning');
    expect(authInsightsStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickAuthInsightsHighlights(items, 2)).toHaveLength(2);
    expect(pickAuthInsightsHighlights(items, 0)).toHaveLength(0);
  });
});
