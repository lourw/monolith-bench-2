import { i18nNumber } from '../../../utils/i18n/i18n-number';
import { validateNumber } from '../../../utils/validate/validate-number';
import {
  emptyRecommendationsOverviewTotals,
  type RecommendationsOverviewItem,
  type RecommendationsOverviewStatus,
  type RecommendationsOverviewTotals,
} from './recommendations-overview.model';

export type RecommendationsOverviewSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalRecommendationsOverview(
  items: ReadonlyArray<RecommendationsOverviewItem>,
): RecommendationsOverviewTotals {
  const totals = emptyRecommendationsOverviewTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupRecommendationsOverviewByStatus(
  items: ReadonlyArray<RecommendationsOverviewItem>,
): Record<RecommendationsOverviewStatus, RecommendationsOverviewItem[]> {
  const grouped: Record<
    RecommendationsOverviewStatus,
    RecommendationsOverviewItem[]
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

export function filterRecommendationsOverview(
  items: ReadonlyArray<RecommendationsOverviewItem>,
  query: string,
): RecommendationsOverviewItem[] {
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

export function sortRecommendationsOverview(
  items: ReadonlyArray<RecommendationsOverviewItem>,
  key: RecommendationsOverviewSortKey,
  direction: 'asc' | 'desc' = 'asc',
): RecommendationsOverviewItem[] {
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

export function describeRecommendationsOverviewItem(
  item: RecommendationsOverviewItem,
): string {
  const amount = i18nNumber(item.amount);
  const name = validateNumber(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatRecommendationsOverviewAmount(amount: number): string {
  return i18nNumber(amount);
}

export function recommendationsOverviewStatusTone(
  status: RecommendationsOverviewStatus,
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

export function pickRecommendationsOverviewHighlights(
  items: ReadonlyArray<RecommendationsOverviewItem>,
  limit = 3,
): RecommendationsOverviewItem[] {
  return sortRecommendationsOverview(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
