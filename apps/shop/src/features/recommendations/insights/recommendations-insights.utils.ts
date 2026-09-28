import { mathName } from '../../../utils/math/math-name';
import { storageSlug } from '../../../utils/storage/storage-slug';
import {
  emptyRecommendationsInsightsTotals,
  type RecommendationsInsightsItem,
  type RecommendationsInsightsStatus,
  type RecommendationsInsightsTotals,
} from './recommendations-insights.model';

export type RecommendationsInsightsSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalRecommendationsInsights(
  items: ReadonlyArray<RecommendationsInsightsItem>,
): RecommendationsInsightsTotals {
  const totals = emptyRecommendationsInsightsTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupRecommendationsInsightsByStatus(
  items: ReadonlyArray<RecommendationsInsightsItem>,
): Record<RecommendationsInsightsStatus, RecommendationsInsightsItem[]> {
  const grouped: Record<
    RecommendationsInsightsStatus,
    RecommendationsInsightsItem[]
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

export function filterRecommendationsInsights(
  items: ReadonlyArray<RecommendationsInsightsItem>,
  query: string,
): RecommendationsInsightsItem[] {
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

export function sortRecommendationsInsights(
  items: ReadonlyArray<RecommendationsInsightsItem>,
  key: RecommendationsInsightsSortKey,
  direction: 'asc' | 'desc' = 'asc',
): RecommendationsInsightsItem[] {
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

export function describeRecommendationsInsightsItem(
  item: RecommendationsInsightsItem,
): string {
  const amount = mathName(item.amount);
  const name = storageSlug(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatRecommendationsInsightsAmount(amount: number): string {
  return mathName(amount);
}

export function recommendationsInsightsStatusTone(
  status: RecommendationsInsightsStatus,
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

export function pickRecommendationsInsightsHighlights(
  items: ReadonlyArray<RecommendationsInsightsItem>,
  limit = 3,
): RecommendationsInsightsItem[] {
  return sortRecommendationsInsights(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
