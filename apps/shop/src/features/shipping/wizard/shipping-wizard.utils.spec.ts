import { describe, expect, it } from 'vitest';
import {
  buildShippingWizardItems,
  SHIPPING_WIZARD_ITEM_COUNT,
} from './shipping-wizard.model';
import {
  describeShippingWizardItem,
  filterShippingWizard,
  groupShippingWizardByStatus,
  pickShippingWizardHighlights,
  sortShippingWizard,
  totalShippingWizard,
  shippingWizardStatusTone,
} from './shipping-wizard.utils';

describe('shipping-wizard utils', () => {
  const items = buildShippingWizardItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(SHIPPING_WIZARD_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      SHIPPING_WIZARD_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalShippingWizard(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupShippingWizardByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterShippingWizard(items, '')).toHaveLength(items.length);
    expect(
      filterShippingWizard(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterShippingWizard(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortShippingWizard(items, 'amount', 'asc');
    const desc = sortShippingWizard(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeShippingWizardItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(shippingWizardStatusTone('active')).toBe('success');
    expect(shippingWizardStatusTone('pending')).toBe('warning');
    expect(shippingWizardStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickShippingWizardHighlights(items, 2)).toHaveLength(2);
    expect(pickShippingWizardHighlights(items, 0)).toHaveLength(0);
  });
});
