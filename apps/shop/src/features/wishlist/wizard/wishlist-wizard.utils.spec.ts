import { describe, expect, it } from 'vitest';
import {
  buildWishlistWizardItems,
  WISHLIST_WIZARD_ITEM_COUNT,
} from './wishlist-wizard.model';
import {
  describeWishlistWizardItem,
  filterWishlistWizard,
  groupWishlistWizardByStatus,
  pickWishlistWizardHighlights,
  sortWishlistWizard,
  totalWishlistWizard,
  wishlistWizardStatusTone,
} from './wishlist-wizard.utils';

describe('wishlist-wizard utils', () => {
  const items = buildWishlistWizardItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(WISHLIST_WIZARD_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      WISHLIST_WIZARD_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalWishlistWizard(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupWishlistWizardByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterWishlistWizard(items, '')).toHaveLength(items.length);
    expect(
      filterWishlistWizard(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterWishlistWizard(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortWishlistWizard(items, 'amount', 'asc');
    const desc = sortWishlistWizard(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeWishlistWizardItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(wishlistWizardStatusTone('active')).toBe('success');
    expect(wishlistWizardStatusTone('pending')).toBe('warning');
    expect(wishlistWizardStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickWishlistWizardHighlights(items, 2)).toHaveLength(2);
    expect(pickWishlistWizardHighlights(items, 0)).toHaveLength(0);
  });
});
