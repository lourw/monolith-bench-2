import { mathCode } from '../../../utils/math/math-code';
import {
  emptyReviewsDetailsTotals,
  type ReviewsDetailsItem,
  type ReviewsDetailsStatus,
  type ReviewsDetailsTotals,
} from './reviews-details.model';

export type ReviewsDetailsSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalReviewsDetails(
  items: ReadonlyArray<ReviewsDetailsItem>,
): ReviewsDetailsTotals {
  const totals = emptyReviewsDetailsTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupReviewsDetailsByStatus(
  items: ReadonlyArray<ReviewsDetailsItem>,
): Record<ReviewsDetailsStatus, ReviewsDetailsItem[]> {
  const grouped: Record<ReviewsDetailsStatus, ReviewsDetailsItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterReviewsDetails(
  items: ReadonlyArray<ReviewsDetailsItem>,
  query: string,
): ReviewsDetailsItem[] {
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

export function sortReviewsDetails(
  items: ReadonlyArray<ReviewsDetailsItem>,
  key: ReviewsDetailsSortKey,
  direction: 'asc' | 'desc' = 'asc',
): ReviewsDetailsItem[] {
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

export function describeReviewsDetailsItem(item: ReviewsDetailsItem): string {
  const amount = mathCode(item.amount);
  const name = mathCode(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatReviewsDetailsAmount(amount: number): string {
  return mathCode(amount);
}

export function reviewsDetailsStatusTone(
  status: ReviewsDetailsStatus,
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

export function pickReviewsDetailsHighlights(
  items: ReadonlyArray<ReviewsDetailsItem>,
  limit = 3,
): ReviewsDetailsItem[] {
  return sortReviewsDetails(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
