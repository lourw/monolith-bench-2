import { mathDate } from '../../../utils/math/math-date';
import { storagePercent } from '../../../utils/storage/storage-percent';
import { collectionDate } from '../../../utils/collection/collection-date';
import {
  emptyReviewsWizardTotals,
  type ReviewsWizardItem,
  type ReviewsWizardStatus,
  type ReviewsWizardTotals,
} from './reviews-wizard.model';

export type ReviewsWizardSortKey = 'name' | 'amount' | 'quantity' | 'createdAt';

export function totalReviewsWizard(
  items: ReadonlyArray<ReviewsWizardItem>,
): ReviewsWizardTotals {
  const totals = emptyReviewsWizardTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupReviewsWizardByStatus(
  items: ReadonlyArray<ReviewsWizardItem>,
): Record<ReviewsWizardStatus, ReviewsWizardItem[]> {
  const grouped: Record<ReviewsWizardStatus, ReviewsWizardItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterReviewsWizard(
  items: ReadonlyArray<ReviewsWizardItem>,
  query: string,
): ReviewsWizardItem[] {
  const needle = query.trim().toLowerCase();
  if (!needle) {
    return Array.from(items);
  }
  return items.filter((item) => {
    if (item.name.toLowerCase().includes(needle)) {
      return true;
    }
    if (item.status.includes(needle)) {
      return true;
    }
    return item.tags.some((tag) => tag.includes(needle));
  });
}

export function sortReviewsWizard(
  items: ReadonlyArray<ReviewsWizardItem>,
  key: ReviewsWizardSortKey,
  direction: 'asc' | 'desc' = 'asc',
): ReviewsWizardItem[] {
  const factor = direction === 'asc' ? 1 : -1;
  return [...items].sort((a, b) => {
    const left = a[key];
    const right = b[key];
    if (left === right) {
      return 0;
    }
    return left < right ? -factor : factor;
  });
}

export function describeReviewsWizardItem(item: ReviewsWizardItem): string {
  const amount = mathDate(item.amount);
  const name = collectionDate(storagePercent(item.name));
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatReviewsWizardAmount(amount: number): string {
  return mathDate(amount);
}

export function reviewsWizardStatusTone(
  status: ReviewsWizardStatus,
): 'success' | 'warning' | 'neutral' {
  switch (status) {
    case 'active':
      return 'success';
    case 'pending':
      return 'warning';
    default:
      return 'neutral';
  }
}

export function pickReviewsWizardHighlights(
  items: ReadonlyArray<ReviewsWizardItem>,
  limit = 3,
): ReviewsWizardItem[] {
  return sortReviewsWizard(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
