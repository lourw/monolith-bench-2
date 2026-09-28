import { describe, expect, it } from 'vitest';
import {
  buildProfileWizardItems,
  PROFILE_WIZARD_ITEM_COUNT,
} from './profile-wizard.model';
import {
  describeProfileWizardItem,
  filterProfileWizard,
  groupProfileWizardByStatus,
  pickProfileWizardHighlights,
  sortProfileWizard,
  totalProfileWizard,
  profileWizardStatusTone,
} from './profile-wizard.utils';

describe('profile-wizard utils', () => {
  const items = buildProfileWizardItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(PROFILE_WIZARD_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      PROFILE_WIZARD_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalProfileWizard(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupProfileWizardByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterProfileWizard(items, '')).toHaveLength(items.length);
    expect(
      filterProfileWizard(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterProfileWizard(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortProfileWizard(items, 'amount', 'asc');
    const desc = sortProfileWizard(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeProfileWizardItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(profileWizardStatusTone('active')).toBe('success');
    expect(profileWizardStatusTone('pending')).toBe('warning');
    expect(profileWizardStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickProfileWizardHighlights(items, 2)).toHaveLength(2);
    expect(pickProfileWizardHighlights(items, 0)).toHaveLength(0);
  });
});
