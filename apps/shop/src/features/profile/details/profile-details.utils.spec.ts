import { describe, expect, it } from 'vitest';
import {
  buildProfileDetailsItems,
  PROFILE_DETAILS_ITEM_COUNT,
} from './profile-details.model';
import {
  describeProfileDetailsItem,
  filterProfileDetails,
  groupProfileDetailsByStatus,
  pickProfileDetailsHighlights,
  sortProfileDetails,
  totalProfileDetails,
  profileDetailsStatusTone,
} from './profile-details.utils';

describe('profile-details utils', () => {
  const items = buildProfileDetailsItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(PROFILE_DETAILS_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      PROFILE_DETAILS_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalProfileDetails(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupProfileDetailsByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterProfileDetails(items, '')).toHaveLength(items.length);
    expect(
      filterProfileDetails(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterProfileDetails(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortProfileDetails(items, 'amount', 'asc');
    const desc = sortProfileDetails(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeProfileDetailsItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(profileDetailsStatusTone('active')).toBe('success');
    expect(profileDetailsStatusTone('pending')).toBe('warning');
    expect(profileDetailsStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickProfileDetailsHighlights(items, 2)).toHaveLength(2);
    expect(pickProfileDetailsHighlights(items, 0)).toHaveLength(0);
  });
});
