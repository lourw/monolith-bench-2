import { mathAddress } from '../../../utils/math/math-address';
import {
  emptyReviewsListTotals,
  type ReviewsListItem,
  type ReviewsListStatus,
  type ReviewsListTotals,
} from './reviews-list.model';

export type ReviewsListSortKey = 'name' | 'amount' | 'quantity' | 'createdAt';

export function totalReviewsList(
  items: ReadonlyArray<ReviewsListItem>,
): ReviewsListTotals {
  const totals = emptyReviewsListTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupReviewsListByStatus(
  items: ReadonlyArray<ReviewsListItem>,
): Record<ReviewsListStatus, ReviewsListItem[]> {
  const grouped: Record<ReviewsListStatus, ReviewsListItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterReviewsList(
  items: ReadonlyArray<ReviewsListItem>,
  query: string,
): ReviewsListItem[] {
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

export function sortReviewsList(
  items: ReadonlyArray<ReviewsListItem>,
  key: ReviewsListSortKey,
  direction: 'asc' | 'desc' = 'asc',
): ReviewsListItem[] {
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

export function describeReviewsListItem(item: ReviewsListItem): string {
  const amount = mathAddress(item.amount);
  const name = mathAddress(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatReviewsListAmount(amount: number): string {
  return mathAddress(amount);
}

export function reviewsListStatusTone(
  status: ReviewsListStatus,
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

export function pickReviewsListHighlights(
  items: ReadonlyArray<ReviewsListItem>,
  limit = 3,
): ReviewsListItem[] {
  return sortReviewsList(items, 'amount', 'desc').slice(0, Math.max(0, limit));
}
