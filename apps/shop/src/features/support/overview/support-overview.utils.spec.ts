import { describe, expect, it } from 'vitest';
import {
  buildSupportOverviewItems,
  SUPPORT_OVERVIEW_ITEM_COUNT,
} from './support-overview.model';
import {
  describeSupportOverviewItem,
  filterSupportOverview,
  groupSupportOverviewByStatus,
  pickSupportOverviewHighlights,
  sortSupportOverview,
  totalSupportOverview,
  supportOverviewStatusTone,
} from './support-overview.utils';

describe('support-overview utils', () => {
  const items = buildSupportOverviewItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(SUPPORT_OVERVIEW_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      SUPPORT_OVERVIEW_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalSupportOverview(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupSupportOverviewByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterSupportOverview(items, '')).toHaveLength(items.length);
    expect(
      filterSupportOverview(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterSupportOverview(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortSupportOverview(items, 'amount', 'asc');
    const desc = sortSupportOverview(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeSupportOverviewItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(supportOverviewStatusTone('active')).toBe('success');
    expect(supportOverviewStatusTone('pending')).toBe('warning');
    expect(supportOverviewStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickSupportOverviewHighlights(items, 2)).toHaveLength(2);
    expect(pickSupportOverviewHighlights(items, 0)).toHaveLength(0);
  });
});
