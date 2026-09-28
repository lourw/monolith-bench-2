import { describe, expect, it } from 'vitest';
import {
  buildSearchWizardItems,
  SEARCH_WIZARD_ITEM_COUNT,
} from './search-wizard.model';
import {
  describeSearchWizardItem,
  filterSearchWizard,
  groupSearchWizardByStatus,
  pickSearchWizardHighlights,
  sortSearchWizard,
  totalSearchWizard,
  searchWizardStatusTone,
} from './search-wizard.utils';

describe('search-wizard utils', () => {
  const items = buildSearchWizardItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(SEARCH_WIZARD_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      SEARCH_WIZARD_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalSearchWizard(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupSearchWizardByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterSearchWizard(items, '')).toHaveLength(items.length);
    expect(
      filterSearchWizard(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterSearchWizard(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortSearchWizard(items, 'amount', 'asc');
    const desc = sortSearchWizard(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeSearchWizardItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(searchWizardStatusTone('active')).toBe('success');
    expect(searchWizardStatusTone('pending')).toBe('warning');
    expect(searchWizardStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickSearchWizardHighlights(items, 2)).toHaveLength(2);
    expect(pickSearchWizardHighlights(items, 0)).toHaveLength(0);
  });
});
