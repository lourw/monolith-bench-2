import { describe, expect, it } from 'vitest';
import {
  buildLoyaltyWizardItems,
  LOYALTY_WIZARD_ITEM_COUNT,
} from './loyalty-wizard.model';
import {
  describeLoyaltyWizardItem,
  filterLoyaltyWizard,
  groupLoyaltyWizardByStatus,
  pickLoyaltyWizardHighlights,
  sortLoyaltyWizard,
  totalLoyaltyWizard,
  loyaltyWizardStatusTone,
} from './loyalty-wizard.utils';

describe('loyalty-wizard utils', () => {
  const items = buildLoyaltyWizardItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(LOYALTY_WIZARD_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      LOYALTY_WIZARD_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalLoyaltyWizard(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupLoyaltyWizardByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterLoyaltyWizard(items, '')).toHaveLength(items.length);
    expect(
      filterLoyaltyWizard(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterLoyaltyWizard(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortLoyaltyWizard(items, 'amount', 'asc');
    const desc = sortLoyaltyWizard(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeLoyaltyWizardItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(loyaltyWizardStatusTone('active')).toBe('success');
    expect(loyaltyWizardStatusTone('pending')).toBe('warning');
    expect(loyaltyWizardStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickLoyaltyWizardHighlights(items, 2)).toHaveLength(2);
    expect(pickLoyaltyWizardHighlights(items, 0)).toHaveLength(0);
  });
});
