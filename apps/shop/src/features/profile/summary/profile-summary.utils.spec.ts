import { describe, expect, it } from 'vitest';
import {
  buildProfileSummaryItems,
  PROFILE_SUMMARY_ITEM_COUNT,
} from './profile-summary.model';
import {
  describeProfileSummaryItem,
  filterProfileSummary,
  groupProfileSummaryByStatus,
  pickProfileSummaryHighlights,
  sortProfileSummary,
  totalProfileSummary,
  profileSummaryStatusTone,
} from './profile-summary.utils';

describe('profile-summary utils', () => {
  const items = buildProfileSummaryItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(PROFILE_SUMMARY_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      PROFILE_SUMMARY_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalProfileSummary(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupProfileSummaryByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterProfileSummary(items, '')).toHaveLength(items.length);
    expect(
      filterProfileSummary(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterProfileSummary(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortProfileSummary(items, 'amount', 'asc');
    const desc = sortProfileSummary(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeProfileSummaryItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(profileSummaryStatusTone('active')).toBe('success');
    expect(profileSummaryStatusTone('pending')).toBe('warning');
    expect(profileSummaryStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickProfileSummaryHighlights(items, 2)).toHaveLength(2);
    expect(pickProfileSummaryHighlights(items, 0)).toHaveLength(0);
  });
});
