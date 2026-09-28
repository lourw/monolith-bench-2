import { describe, expect, it } from 'vitest';
import {
  buildNotificationsWizardItems,
  NOTIFICATIONS_WIZARD_ITEM_COUNT,
} from './notifications-wizard.model';
import {
  describeNotificationsWizardItem,
  filterNotificationsWizard,
  groupNotificationsWizardByStatus,
  pickNotificationsWizardHighlights,
  sortNotificationsWizard,
  totalNotificationsWizard,
  notificationsWizardStatusTone,
} from './notifications-wizard.utils';

describe('notifications-wizard utils', () => {
  const items = buildNotificationsWizardItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(NOTIFICATIONS_WIZARD_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      NOTIFICATIONS_WIZARD_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalNotificationsWizard(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupNotificationsWizardByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterNotificationsWizard(items, '')).toHaveLength(items.length);
    expect(
      filterNotificationsWizard(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterNotificationsWizard(items, 'no-such-thing-xyz')).toHaveLength(
      0,
    );
  });

  it('sorts by key in both directions', () => {
    const asc = sortNotificationsWizard(items, 'amount', 'asc');
    const desc = sortNotificationsWizard(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeNotificationsWizardItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(notificationsWizardStatusTone('active')).toBe('success');
    expect(notificationsWizardStatusTone('pending')).toBe('warning');
    expect(notificationsWizardStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickNotificationsWizardHighlights(items, 2)).toHaveLength(2);
    expect(pickNotificationsWizardHighlights(items, 0)).toHaveLength(0);
  });
});
