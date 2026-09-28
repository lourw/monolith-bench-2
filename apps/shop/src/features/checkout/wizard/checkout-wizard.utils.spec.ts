import { describe, expect, it } from 'vitest';
import {
  buildCheckoutWizardItems,
  CHECKOUT_WIZARD_ITEM_COUNT,
} from './checkout-wizard.model';
import {
  describeCheckoutWizardItem,
  filterCheckoutWizard,
  groupCheckoutWizardByStatus,
  pickCheckoutWizardHighlights,
  sortCheckoutWizard,
  totalCheckoutWizard,
  checkoutWizardStatusTone,
} from './checkout-wizard.utils';

describe('checkout-wizard utils', () => {
  const items = buildCheckoutWizardItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(CHECKOUT_WIZARD_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      CHECKOUT_WIZARD_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalCheckoutWizard(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupCheckoutWizardByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterCheckoutWizard(items, '')).toHaveLength(items.length);
    expect(
      filterCheckoutWizard(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterCheckoutWizard(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortCheckoutWizard(items, 'amount', 'asc');
    const desc = sortCheckoutWizard(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeCheckoutWizardItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(checkoutWizardStatusTone('active')).toBe('success');
    expect(checkoutWizardStatusTone('pending')).toBe('warning');
    expect(checkoutWizardStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickCheckoutWizardHighlights(items, 2)).toHaveLength(2);
    expect(pickCheckoutWizardHighlights(items, 0)).toHaveLength(0);
  });
});
