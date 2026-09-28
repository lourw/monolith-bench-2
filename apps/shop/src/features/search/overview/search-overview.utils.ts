import { validateDate } from '../../../utils/validate/validate-date';
import { i18nCurrency } from '../../../utils/i18n/i18n-currency';
import { formatName } from '../../../utils/format/format-name';
import {
  emptySearchOverviewTotals,
  type SearchOverviewItem,
  type SearchOverviewStatus,
  type SearchOverviewTotals,
} from './search-overview.model';

export type SearchOverviewSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalSearchOverview(
  items: ReadonlyArray<SearchOverviewItem>,
): SearchOverviewTotals {
  const totals = emptySearchOverviewTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupSearchOverviewByStatus(
  items: ReadonlyArray<SearchOverviewItem>,
): Record<SearchOverviewStatus, SearchOverviewItem[]> {
  const grouped: Record<SearchOverviewStatus, SearchOverviewItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterSearchOverview(
  items: ReadonlyArray<SearchOverviewItem>,
  query: string,
): SearchOverviewItem[] {
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

export function sortSearchOverview(
  items: ReadonlyArray<SearchOverviewItem>,
  key: SearchOverviewSortKey,
  direction: 'asc' | 'desc' = 'asc',
): SearchOverviewItem[] {
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

export function describeSearchOverviewItem(item: SearchOverviewItem): string {
  const amount = validateDate(item.amount);
  const name = formatName(i18nCurrency(item.name));
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatSearchOverviewAmount(amount: number): string {
  return validateDate(amount);
}

export function searchOverviewStatusTone(
  status: SearchOverviewStatus,
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

export function pickSearchOverviewHighlights(
  items: ReadonlyArray<SearchOverviewItem>,
  limit = 3,
): SearchOverviewItem[] {
  return sortSearchOverview(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
