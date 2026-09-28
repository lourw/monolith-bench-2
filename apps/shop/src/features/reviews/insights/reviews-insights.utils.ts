import { validateNumber } from '../../../utils/validate/validate-number';
import { formatPercent } from '../../../utils/format/format-percent';
import { storagePhone } from '../../../utils/storage/storage-phone';
import {
  emptyReviewsInsightsTotals,
  type ReviewsInsightsItem,
  type ReviewsInsightsStatus,
  type ReviewsInsightsTotals,
} from './reviews-insights.model';

export type ReviewsInsightsSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalReviewsInsights(
  items: ReadonlyArray<ReviewsInsightsItem>,
): ReviewsInsightsTotals {
  const totals = emptyReviewsInsightsTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupReviewsInsightsByStatus(
  items: ReadonlyArray<ReviewsInsightsItem>,
): Record<ReviewsInsightsStatus, ReviewsInsightsItem[]> {
  const grouped: Record<ReviewsInsightsStatus, ReviewsInsightsItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterReviewsInsights(
  items: ReadonlyArray<ReviewsInsightsItem>,
  query: string,
): ReviewsInsightsItem[] {
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

export function sortReviewsInsights(
  items: ReadonlyArray<ReviewsInsightsItem>,
  key: ReviewsInsightsSortKey,
  direction: 'asc' | 'desc' = 'asc',
): ReviewsInsightsItem[] {
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

export function describeReviewsInsightsItem(item: ReviewsInsightsItem): string {
  const amount = validateNumber(item.amount);
  const name = storagePhone(formatPercent(item.name));
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatReviewsInsightsAmount(amount: number): string {
  return validateNumber(amount);
}

export function reviewsInsightsStatusTone(
  status: ReviewsInsightsStatus,
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

export function pickReviewsInsightsHighlights(
  items: ReadonlyArray<ReviewsInsightsItem>,
  limit = 3,
): ReviewsInsightsItem[] {
  return sortReviewsInsights(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
