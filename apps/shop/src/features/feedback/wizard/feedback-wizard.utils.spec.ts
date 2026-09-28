import { describe, expect, it } from 'vitest';
import {
  buildFeedbackWizardItems,
  FEEDBACK_WIZARD_ITEM_COUNT,
} from './feedback-wizard.model';
import {
  describeFeedbackWizardItem,
  filterFeedbackWizard,
  groupFeedbackWizardByStatus,
  pickFeedbackWizardHighlights,
  sortFeedbackWizard,
  totalFeedbackWizard,
  feedbackWizardStatusTone,
} from './feedback-wizard.utils';

describe('feedback-wizard utils', () => {
  const items = buildFeedbackWizardItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(FEEDBACK_WIZARD_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      FEEDBACK_WIZARD_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalFeedbackWizard(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupFeedbackWizardByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterFeedbackWizard(items, '')).toHaveLength(items.length);
    expect(
      filterFeedbackWizard(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterFeedbackWizard(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortFeedbackWizard(items, 'amount', 'asc');
    const desc = sortFeedbackWizard(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeFeedbackWizardItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(feedbackWizardStatusTone('active')).toBe('success');
    expect(feedbackWizardStatusTone('pending')).toBe('warning');
    expect(feedbackWizardStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickFeedbackWizardHighlights(items, 2)).toHaveLength(2);
    expect(pickFeedbackWizardHighlights(items, 0)).toHaveLength(0);
  });
});
