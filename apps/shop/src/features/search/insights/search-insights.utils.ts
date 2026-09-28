import { i18nNumber } from '../../../utils/i18n/i18n-number';
import {
  emptySearchInsightsTotals,
  type SearchInsightsItem,
  type SearchInsightsStatus,
  type SearchInsightsTotals,
} from './search-insights.model';

export type SearchInsightsSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalSearchInsights(
  items: ReadonlyArray<SearchInsightsItem>,
): SearchInsightsTotals {
  const totals = emptySearchInsightsTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupSearchInsightsByStatus(
  items: ReadonlyArray<SearchInsightsItem>,
): Record<SearchInsightsStatus, SearchInsightsItem[]> {
  const grouped: Record<SearchInsightsStatus, SearchInsightsItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterSearchInsights(
  items: ReadonlyArray<SearchInsightsItem>,
  query: string,
): SearchInsightsItem[] {
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

export function sortSearchInsights(
  items: ReadonlyArray<SearchInsightsItem>,
  key: SearchInsightsSortKey,
  direction: 'asc' | 'desc' = 'asc',
): SearchInsightsItem[] {
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

export function describeSearchInsightsItem(item: SearchInsightsItem): string {
  const amount = i18nNumber(item.amount);
  const name = i18nNumber(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatSearchInsightsAmount(amount: number): string {
  return i18nNumber(amount);
}

export function searchInsightsStatusTone(
  status: SearchInsightsStatus,
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

export function pickSearchInsightsHighlights(
  items: ReadonlyArray<SearchInsightsItem>,
  limit = 3,
): SearchInsightsItem[] {
  return sortSearchInsights(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
