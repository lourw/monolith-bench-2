import { describe, expect, it } from 'vitest';
import {
  buildCartWizardItems,
  CART_WIZARD_ITEM_COUNT,
} from './cart-wizard.model';
import {
  describeCartWizardItem,
  filterCartWizard,
  groupCartWizardByStatus,
  pickCartWizardHighlights,
  sortCartWizard,
  totalCartWizard,
  cartWizardStatusTone,
} from './cart-wizard.utils';

describe('cart-wizard utils', () => {
  const items = buildCartWizardItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(CART_WIZARD_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      CART_WIZARD_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalCartWizard(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupCartWizardByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterCartWizard(items, '')).toHaveLength(items.length);
    expect(
      filterCartWizard(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterCartWizard(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortCartWizard(items, 'amount', 'asc');
    const desc = sortCartWizard(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeCartWizardItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(cartWizardStatusTone('active')).toBe('success');
    expect(cartWizardStatusTone('pending')).toBe('warning');
    expect(cartWizardStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickCartWizardHighlights(items, 2)).toHaveLength(2);
    expect(pickCartWizardHighlights(items, 0)).toHaveLength(0);
  });
});
