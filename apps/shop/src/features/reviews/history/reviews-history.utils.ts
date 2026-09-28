import { i18nAddress } from '../../../utils/i18n/i18n-address';
import { storagePhone } from '../../../utils/storage/storage-phone';
import { collectionAddress } from '../../../utils/collection/collection-address';
import {
  emptyReviewsHistoryTotals,
  type ReviewsHistoryItem,
  type ReviewsHistoryStatus,
  type ReviewsHistoryTotals,
} from './reviews-history.model';

export type ReviewsHistorySortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalReviewsHistory(
  items: ReadonlyArray<ReviewsHistoryItem>,
): ReviewsHistoryTotals {
  const totals = emptyReviewsHistoryTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupReviewsHistoryByStatus(
  items: ReadonlyArray<ReviewsHistoryItem>,
): Record<ReviewsHistoryStatus, ReviewsHistoryItem[]> {
  const grouped: Record<ReviewsHistoryStatus, ReviewsHistoryItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterReviewsHistory(
  items: ReadonlyArray<ReviewsHistoryItem>,
  query: string,
): ReviewsHistoryItem[] {
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

export function sortReviewsHistory(
  items: ReadonlyArray<ReviewsHistoryItem>,
  key: ReviewsHistorySortKey,
  direction: 'asc' | 'desc' = 'asc',
): ReviewsHistoryItem[] {
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

export function describeReviewsHistoryItem(item: ReviewsHistoryItem): string {
  const amount = i18nAddress(item.amount);
  const name = collectionAddress(storagePhone(item.name));
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatReviewsHistoryAmount(amount: number): string {
  return i18nAddress(amount);
}

export function reviewsHistoryStatusTone(
  status: ReviewsHistoryStatus,
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

export function pickReviewsHistoryHighlights(
  items: ReadonlyArray<ReviewsHistoryItem>,
  limit = 3,
): ReviewsHistoryItem[] {
  return sortReviewsHistory(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
