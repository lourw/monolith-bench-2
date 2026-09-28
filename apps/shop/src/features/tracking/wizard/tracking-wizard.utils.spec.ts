import { describe, expect, it } from 'vitest';
import {
  buildTrackingWizardItems,
  TRACKING_WIZARD_ITEM_COUNT,
} from './tracking-wizard.model';
import {
  describeTrackingWizardItem,
  filterTrackingWizard,
  groupTrackingWizardByStatus,
  pickTrackingWizardHighlights,
  sortTrackingWizard,
  totalTrackingWizard,
  trackingWizardStatusTone,
} from './tracking-wizard.utils';

describe('tracking-wizard utils', () => {
  const items = buildTrackingWizardItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(TRACKING_WIZARD_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      TRACKING_WIZARD_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalTrackingWizard(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupTrackingWizardByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterTrackingWizard(items, '')).toHaveLength(items.length);
    expect(
      filterTrackingWizard(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterTrackingWizard(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortTrackingWizard(items, 'amount', 'asc');
    const desc = sortTrackingWizard(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeTrackingWizardItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(trackingWizardStatusTone('active')).toBe('success');
    expect(trackingWizardStatusTone('pending')).toBe('warning');
    expect(trackingWizardStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickTrackingWizardHighlights(items, 2)).toHaveLength(2);
    expect(pickTrackingWizardHighlights(items, 0)).toHaveLength(0);
  });
});
