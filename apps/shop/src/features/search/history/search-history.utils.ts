import { formatCurrency } from '../../../utils/format/format-currency';
import {
  emptySearchHistoryTotals,
  type SearchHistoryItem,
  type SearchHistoryStatus,
  type SearchHistoryTotals,
} from './search-history.model';

export type SearchHistorySortKey = 'name' | 'amount' | 'quantity' | 'createdAt';

export function totalSearchHistory(
  items: ReadonlyArray<SearchHistoryItem>,
): SearchHistoryTotals {
  const totals = emptySearchHistoryTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupSearchHistoryByStatus(
  items: ReadonlyArray<SearchHistoryItem>,
): Record<SearchHistoryStatus, SearchHistoryItem[]> {
  const grouped: Record<SearchHistoryStatus, SearchHistoryItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterSearchHistory(
  items: ReadonlyArray<SearchHistoryItem>,
  query: string,
): SearchHistoryItem[] {
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

export function sortSearchHistory(
  items: ReadonlyArray<SearchHistoryItem>,
  key: SearchHistorySortKey,
  direction: 'asc' | 'desc' = 'asc',
): SearchHistoryItem[] {
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

export function describeSearchHistoryItem(item: SearchHistoryItem): string {
  const amount = formatCurrency(item.amount);
  const name = formatCurrency(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatSearchHistoryAmount(amount: number): string {
  return formatCurrency(amount);
}

export function searchHistoryStatusTone(
  status: SearchHistoryStatus,
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

export function pickSearchHistoryHighlights(
  items: ReadonlyArray<SearchHistoryItem>,
  limit = 3,
): SearchHistoryItem[] {
  return sortSearchHistory(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
