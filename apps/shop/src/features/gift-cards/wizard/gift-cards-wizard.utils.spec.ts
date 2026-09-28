import { describe, expect, it } from 'vitest';
import {
  buildGiftCardsWizardItems,
  GIFT_CARDS_WIZARD_ITEM_COUNT,
} from './gift-cards-wizard.model';
import {
  describeGiftCardsWizardItem,
  filterGiftCardsWizard,
  groupGiftCardsWizardByStatus,
  pickGiftCardsWizardHighlights,
  sortGiftCardsWizard,
  totalGiftCardsWizard,
  giftCardsWizardStatusTone,
} from './gift-cards-wizard.utils';

describe('gift-cards-wizard utils', () => {
  const items = buildGiftCardsWizardItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(GIFT_CARDS_WIZARD_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      GIFT_CARDS_WIZARD_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalGiftCardsWizard(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupGiftCardsWizardByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterGiftCardsWizard(items, '')).toHaveLength(items.length);
    expect(
      filterGiftCardsWizard(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterGiftCardsWizard(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortGiftCardsWizard(items, 'amount', 'asc');
    const desc = sortGiftCardsWizard(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeGiftCardsWizardItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(giftCardsWizardStatusTone('active')).toBe('success');
    expect(giftCardsWizardStatusTone('pending')).toBe('warning');
    expect(giftCardsWizardStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickGiftCardsWizardHighlights(items, 2)).toHaveLength(2);
    expect(pickGiftCardsWizardHighlights(items, 0)).toHaveLength(0);
  });
});
