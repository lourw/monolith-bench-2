import { i18nDate } from '../../../utils/i18n/i18n-date';
import {
  emptyRecommendationsDetailsTotals,
  type RecommendationsDetailsItem,
  type RecommendationsDetailsStatus,
  type RecommendationsDetailsTotals,
} from './recommendations-details.model';

export type RecommendationsDetailsSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalRecommendationsDetails(
  items: ReadonlyArray<RecommendationsDetailsItem>,
): RecommendationsDetailsTotals {
  const totals = emptyRecommendationsDetailsTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupRecommendationsDetailsByStatus(
  items: ReadonlyArray<RecommendationsDetailsItem>,
): Record<RecommendationsDetailsStatus, RecommendationsDetailsItem[]> {
  const grouped: Record<
    RecommendationsDetailsStatus,
    RecommendationsDetailsItem[]
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

export function filterRecommendationsDetails(
  items: ReadonlyArray<RecommendationsDetailsItem>,
  query: string,
): RecommendationsDetailsItem[] {
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

export function sortRecommendationsDetails(
  items: ReadonlyArray<RecommendationsDetailsItem>,
  key: RecommendationsDetailsSortKey,
  direction: 'asc' | 'desc' = 'asc',
): RecommendationsDetailsItem[] {
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

export function describeRecommendationsDetailsItem(
  item: RecommendationsDetailsItem,
): string {
  const amount = i18nDate(item.amount);
  const name = i18nDate(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatRecommendationsDetailsAmount(amount: number): string {
  return i18nDate(amount);
}

export function recommendationsDetailsStatusTone(
  status: RecommendationsDetailsStatus,
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

export function pickRecommendationsDetailsHighlights(
  items: ReadonlyArray<RecommendationsDetailsItem>,
  limit = 3,
): RecommendationsDetailsItem[] {
  return sortRecommendationsDetails(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
