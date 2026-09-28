import { describe, expect, it } from 'vitest';
import {
  buildCatalogWizardItems,
  CATALOG_WIZARD_ITEM_COUNT,
} from './catalog-wizard.model';
import {
  describeCatalogWizardItem,
  filterCatalogWizard,
  groupCatalogWizardByStatus,
  pickCatalogWizardHighlights,
  sortCatalogWizard,
  totalCatalogWizard,
  catalogWizardStatusTone,
} from './catalog-wizard.utils';

describe('catalog-wizard utils', () => {
  const items = buildCatalogWizardItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(CATALOG_WIZARD_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      CATALOG_WIZARD_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalCatalogWizard(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupCatalogWizardByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterCatalogWizard(items, '')).toHaveLength(items.length);
    expect(
      filterCatalogWizard(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterCatalogWizard(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortCatalogWizard(items, 'amount', 'asc');
    const desc = sortCatalogWizard(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeCatalogWizardItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(catalogWizardStatusTone('active')).toBe('success');
    expect(catalogWizardStatusTone('pending')).toBe('warning');
    expect(catalogWizardStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickCatalogWizardHighlights(items, 2)).toHaveLength(2);
    expect(pickCatalogWizardHighlights(items, 0)).toHaveLength(0);
  });
});
