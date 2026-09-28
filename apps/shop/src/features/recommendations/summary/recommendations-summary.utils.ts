import { validateSlug } from '../../../utils/validate/validate-slug';
import { asyncText } from '../../../utils/async/async-text';
import {
  emptyRecommendationsSummaryTotals,
  type RecommendationsSummaryItem,
  type RecommendationsSummaryStatus,
  type RecommendationsSummaryTotals,
} from './recommendations-summary.model';

export type RecommendationsSummarySortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalRecommendationsSummary(
  items: ReadonlyArray<RecommendationsSummaryItem>,
): RecommendationsSummaryTotals {
  const totals = emptyRecommendationsSummaryTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupRecommendationsSummaryByStatus(
  items: ReadonlyArray<RecommendationsSummaryItem>,
): Record<RecommendationsSummaryStatus, RecommendationsSummaryItem[]> {
  const grouped: Record<
    RecommendationsSummaryStatus,
    RecommendationsSummaryItem[]
  > = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterRecommendationsSummary(
  items: ReadonlyArray<RecommendationsSummaryItem>,
  query: string,
): RecommendationsSummaryItem[] {
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

export function sortRecommendationsSummary(
  items: ReadonlyArray<RecommendationsSummaryItem>,
  key: RecommendationsSummarySortKey,
  direction: 'asc' | 'desc' = 'asc',
): RecommendationsSummaryItem[] {
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

export function describeRecommendationsSummaryItem(
  item: RecommendationsSummaryItem,
): string {
  const amount = validateSlug(item.amount);
  const name = asyncText(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatRecommendationsSummaryAmount(amount: number): string {
  return validateSlug(amount);
}

export function recommendationsSummaryStatusTone(
  status: RecommendationsSummaryStatus,
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

export function pickRecommendationsSummaryHighlights(
  items: ReadonlyArray<RecommendationsSummaryItem>,
  limit = 3,
): RecommendationsSummaryItem[] {
  return sortRecommendationsSummary(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
