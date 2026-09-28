import { describe, expect, it } from 'vitest';
import {
  buildPromotionsWizardItems,
  PROMOTIONS_WIZARD_ITEM_COUNT,
} from './promotions-wizard.model';
import {
  describePromotionsWizardItem,
  filterPromotionsWizard,
  groupPromotionsWizardByStatus,
  pickPromotionsWizardHighlights,
  sortPromotionsWizard,
  totalPromotionsWizard,
  promotionsWizardStatusTone,
} from './promotions-wizard.utils';

describe('promotions-wizard utils', () => {
  const items = buildPromotionsWizardItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(PROMOTIONS_WIZARD_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      PROMOTIONS_WIZARD_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalPromotionsWizard(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupPromotionsWizardByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterPromotionsWizard(items, '')).toHaveLength(items.length);
    expect(
      filterPromotionsWizard(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterPromotionsWizard(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortPromotionsWizard(items, 'amount', 'asc');
    const desc = sortPromotionsWizard(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describePromotionsWizardItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(promotionsWizardStatusTone('active')).toBe('success');
    expect(promotionsWizardStatusTone('pending')).toBe('warning');
    expect(promotionsWizardStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickPromotionsWizardHighlights(items, 2)).toHaveLength(2);
    expect(pickPromotionsWizardHighlights(items, 0)).toHaveLength(0);
  });
});
