import { validatePhone } from '../../../utils/validate/validate-phone';
import { collectionCode } from '../../../utils/collection/collection-code';
import { storageCurrency } from '../../../utils/storage/storage-currency';
import {
  emptyRecommendationsHistoryTotals,
  type RecommendationsHistoryItem,
  type RecommendationsHistoryStatus,
  type RecommendationsHistoryTotals,
} from './recommendations-history.model';

export type RecommendationsHistorySortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalRecommendationsHistory(
  items: ReadonlyArray<RecommendationsHistoryItem>,
): RecommendationsHistoryTotals {
  const totals = emptyRecommendationsHistoryTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupRecommendationsHistoryByStatus(
  items: ReadonlyArray<RecommendationsHistoryItem>,
): Record<RecommendationsHistoryStatus, RecommendationsHistoryItem[]> {
  const grouped: Record<
    RecommendationsHistoryStatus,
    RecommendationsHistoryItem[]
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

export function filterRecommendationsHistory(
  items: ReadonlyArray<RecommendationsHistoryItem>,
  query: string,
): RecommendationsHistoryItem[] {
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

export function sortRecommendationsHistory(
  items: ReadonlyArray<RecommendationsHistoryItem>,
  key: RecommendationsHistorySortKey,
  direction: 'asc' | 'desc' = 'asc',
): RecommendationsHistoryItem[] {
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

export function describeRecommendationsHistoryItem(
  item: RecommendationsHistoryItem,
): string {
  const amount = validatePhone(item.amount);
  const name = storageCurrency(collectionCode(item.name));
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatRecommendationsHistoryAmount(amount: number): string {
  return validatePhone(amount);
}

export function recommendationsHistoryStatusTone(
  status: RecommendationsHistoryStatus,
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

export function pickRecommendationsHistoryHighlights(
  items: ReadonlyArray<RecommendationsHistoryItem>,
  limit = 3,
): RecommendationsHistoryItem[] {
  return sortRecommendationsHistory(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
