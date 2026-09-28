import { describe, expect, it } from 'vitest';
import {
  buildProfileInsightsItems,
  PROFILE_INSIGHTS_ITEM_COUNT,
} from './profile-insights.model';
import {
  describeProfileInsightsItem,
  filterProfileInsights,
  groupProfileInsightsByStatus,
  pickProfileInsightsHighlights,
  sortProfileInsights,
  totalProfileInsights,
  profileInsightsStatusTone,
} from './profile-insights.utils';

describe('profile-insights utils', () => {
  const items = buildProfileInsightsItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(PROFILE_INSIGHTS_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      PROFILE_INSIGHTS_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalProfileInsights(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupProfileInsightsByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterProfileInsights(items, '')).toHaveLength(items.length);
    expect(
      filterProfileInsights(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterProfileInsights(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortProfileInsights(items, 'amount', 'asc');
    const desc = sortProfileInsights(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeProfileInsightsItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(profileInsightsStatusTone('active')).toBe('success');
    expect(profileInsightsStatusTone('pending')).toBe('warning');
    expect(profileInsightsStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickProfileInsightsHighlights(items, 2)).toHaveLength(2);
    expect(pickProfileInsightsHighlights(items, 0)).toHaveLength(0);
  });
});
