import { asyncText } from '../../../utils/async/async-text';
import { mathSlug } from '../../../utils/math/math-slug';
import {
  emptySearchDashboardTotals,
  type SearchDashboardItem,
  type SearchDashboardStatus,
  type SearchDashboardTotals,
} from './search-dashboard.model';

export type SearchDashboardSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalSearchDashboard(
  items: ReadonlyArray<SearchDashboardItem>,
): SearchDashboardTotals {
  const totals = emptySearchDashboardTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupSearchDashboardByStatus(
  items: ReadonlyArray<SearchDashboardItem>,
): Record<SearchDashboardStatus, SearchDashboardItem[]> {
  const grouped: Record<SearchDashboardStatus, SearchDashboardItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterSearchDashboard(
  items: ReadonlyArray<SearchDashboardItem>,
  query: string,
): SearchDashboardItem[] {
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

export function sortSearchDashboard(
  items: ReadonlyArray<SearchDashboardItem>,
  key: SearchDashboardSortKey,
  direction: 'asc' | 'desc' = 'asc',
): SearchDashboardItem[] {
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

export function describeSearchDashboardItem(item: SearchDashboardItem): string {
  const amount = asyncText(item.amount);
  const name = mathSlug(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatSearchDashboardAmount(amount: number): string {
  return asyncText(amount);
}

export function searchDashboardStatusTone(
  status: SearchDashboardStatus,
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

export function pickSearchDashboardHighlights(
  items: ReadonlyArray<SearchDashboardItem>,
  limit = 3,
): SearchDashboardItem[] {
  return sortSearchDashboard(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
