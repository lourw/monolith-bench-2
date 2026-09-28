import { i18nDate } from '../../../utils/i18n/i18n-date';
import { storageSlug } from '../../../utils/storage/storage-slug';
import {
  emptyReviewsOverviewTotals,
  type ReviewsOverviewItem,
  type ReviewsOverviewStatus,
  type ReviewsOverviewTotals,
} from './reviews-overview.model';

export type ReviewsOverviewSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalReviewsOverview(
  items: ReadonlyArray<ReviewsOverviewItem>,
): ReviewsOverviewTotals {
  const totals = emptyReviewsOverviewTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupReviewsOverviewByStatus(
  items: ReadonlyArray<ReviewsOverviewItem>,
): Record<ReviewsOverviewStatus, ReviewsOverviewItem[]> {
  const grouped: Record<ReviewsOverviewStatus, ReviewsOverviewItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterReviewsOverview(
  items: ReadonlyArray<ReviewsOverviewItem>,
  query: string,
): ReviewsOverviewItem[] {
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

export function sortReviewsOverview(
  items: ReadonlyArray<ReviewsOverviewItem>,
  key: ReviewsOverviewSortKey,
  direction: 'asc' | 'desc' = 'asc',
): ReviewsOverviewItem[] {
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

export function describeReviewsOverviewItem(item: ReviewsOverviewItem): string {
  const amount = i18nDate(item.amount);
  const name = storageSlug(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatReviewsOverviewAmount(amount: number): string {
  return i18nDate(amount);
}

export function reviewsOverviewStatusTone(
  status: ReviewsOverviewStatus,
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

export function pickReviewsOverviewHighlights(
  items: ReadonlyArray<ReviewsOverviewItem>,
  limit = 3,
): ReviewsOverviewItem[] {
  return sortReviewsOverview(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
