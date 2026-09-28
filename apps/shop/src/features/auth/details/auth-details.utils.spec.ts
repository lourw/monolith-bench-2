import { describe, expect, it } from 'vitest';
import {
  buildAuthDetailsItems,
  AUTH_DETAILS_ITEM_COUNT,
} from './auth-details.model';
import {
  describeAuthDetailsItem,
  filterAuthDetails,
  groupAuthDetailsByStatus,
  pickAuthDetailsHighlights,
  sortAuthDetails,
  totalAuthDetails,
  authDetailsStatusTone,
} from './auth-details.utils';

describe('auth-details utils', () => {
  const items = buildAuthDetailsItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(AUTH_DETAILS_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      AUTH_DETAILS_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalAuthDetails(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupAuthDetailsByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterAuthDetails(items, '')).toHaveLength(items.length);
    expect(
      filterAuthDetails(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterAuthDetails(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortAuthDetails(items, 'amount', 'asc');
    const desc = sortAuthDetails(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeAuthDetailsItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(authDetailsStatusTone('active')).toBe('success');
    expect(authDetailsStatusTone('pending')).toBe('warning');
    expect(authDetailsStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickAuthDetailsHighlights(items, 2)).toHaveLength(2);
    expect(pickAuthDetailsHighlights(items, 0)).toHaveLength(0);
  });
});
