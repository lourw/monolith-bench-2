import { describe, expect, it } from 'vitest';
import {
  buildReviewsWizardItems,
  REVIEWS_WIZARD_ITEM_COUNT,
} from './reviews-wizard.model';
import {
  describeReviewsWizardItem,
  filterReviewsWizard,
  groupReviewsWizardByStatus,
  pickReviewsWizardHighlights,
  sortReviewsWizard,
  totalReviewsWizard,
  reviewsWizardStatusTone,
} from './reviews-wizard.utils';

describe('reviews-wizard utils', () => {
  const items = buildReviewsWizardItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(REVIEWS_WIZARD_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      REVIEWS_WIZARD_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalReviewsWizard(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupReviewsWizardByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterReviewsWizard(items, '')).toHaveLength(items.length);
    expect(
      filterReviewsWizard(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterReviewsWizard(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortReviewsWizard(items, 'amount', 'asc');
    const desc = sortReviewsWizard(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeReviewsWizardItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(reviewsWizardStatusTone('active')).toBe('success');
    expect(reviewsWizardStatusTone('pending')).toBe('warning');
    expect(reviewsWizardStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickReviewsWizardHighlights(items, 2)).toHaveLength(2);
    expect(pickReviewsWizardHighlights(items, 0)).toHaveLength(0);
  });
});
