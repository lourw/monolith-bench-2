import { validateCurrency } from '../../../utils/validate/validate-currency';
import { validateName } from '../../../utils/validate/validate-name';
import { i18nCode } from '../../../utils/i18n/i18n-code';
import {
  emptyRecommendationsListTotals,
  type RecommendationsListItem,
  type RecommendationsListStatus,
  type RecommendationsListTotals,
} from './recommendations-list.model';

export type RecommendationsListSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalRecommendationsList(
  items: ReadonlyArray<RecommendationsListItem>,
): RecommendationsListTotals {
  const totals = emptyRecommendationsListTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupRecommendationsListByStatus(
  items: ReadonlyArray<RecommendationsListItem>,
): Record<RecommendationsListStatus, RecommendationsListItem[]> {
  const grouped: Record<RecommendationsListStatus, RecommendationsListItem[]> =
    {
      active: [],
      pending: [],
      archived: [],
    };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterRecommendationsList(
  items: ReadonlyArray<RecommendationsListItem>,
  query: string,
): RecommendationsListItem[] {
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

export function sortRecommendationsList(
  items: ReadonlyArray<RecommendationsListItem>,
  key: RecommendationsListSortKey,
  direction: 'asc' | 'desc' = 'asc',
): RecommendationsListItem[] {
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

export function describeRecommendationsListItem(
  item: RecommendationsListItem,
): string {
  const amount = validateCurrency(item.amount);
  const name = i18nCode(validateName(item.name));
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatRecommendationsListAmount(amount: number): string {
  return validateCurrency(amount);
}

export function recommendationsListStatusTone(
  status: RecommendationsListStatus,
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

export function pickRecommendationsListHighlights(
  items: ReadonlyArray<RecommendationsListItem>,
  limit = 3,
): RecommendationsListItem[] {
  return sortRecommendationsList(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
