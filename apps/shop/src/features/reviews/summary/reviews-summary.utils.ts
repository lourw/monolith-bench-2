import { collectionName } from '../../../utils/collection/collection-name';
import {
  emptyReviewsSummaryTotals,
  type ReviewsSummaryItem,
  type ReviewsSummaryStatus,
  type ReviewsSummaryTotals,
} from './reviews-summary.model';

export type ReviewsSummarySortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalReviewsSummary(
  items: ReadonlyArray<ReviewsSummaryItem>,
): ReviewsSummaryTotals {
  const totals = emptyReviewsSummaryTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupReviewsSummaryByStatus(
  items: ReadonlyArray<ReviewsSummaryItem>,
): Record<ReviewsSummaryStatus, ReviewsSummaryItem[]> {
  const grouped: Record<ReviewsSummaryStatus, ReviewsSummaryItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterReviewsSummary(
  items: ReadonlyArray<ReviewsSummaryItem>,
  query: string,
): ReviewsSummaryItem[] {
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

export function sortReviewsSummary(
  items: ReadonlyArray<ReviewsSummaryItem>,
  key: ReviewsSummarySortKey,
  direction: 'asc' | 'desc' = 'asc',
): ReviewsSummaryItem[] {
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

export function describeReviewsSummaryItem(item: ReviewsSummaryItem): string {
  const amount = collectionName(item.amount);
  const name = collectionName(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatReviewsSummaryAmount(amount: number): string {
  return collectionName(amount);
}

export function reviewsSummaryStatusTone(
  status: ReviewsSummaryStatus,
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

export function pickReviewsSummaryHighlights(
  items: ReadonlyArray<ReviewsSummaryItem>,
  limit = 3,
): ReviewsSummaryItem[] {
  return sortReviewsSummary(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
