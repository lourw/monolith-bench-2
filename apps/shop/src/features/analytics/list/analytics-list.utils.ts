import { i18nText } from '../../../utils/i18n/i18n-text';
import { formatCurrency } from '../../../utils/format/format-currency';
import { formatPercent } from '../../../utils/format/format-percent';
import {
  emptyAnalyticsListTotals,
  type AnalyticsListItem,
  type AnalyticsListStatus,
  type AnalyticsListTotals,
} from './analytics-list.model';

export type AnalyticsListSortKey = 'name' | 'amount' | 'quantity' | 'createdAt';

export function totalAnalyticsList(
  items: ReadonlyArray<AnalyticsListItem>,
): AnalyticsListTotals {
  const totals = emptyAnalyticsListTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupAnalyticsListByStatus(
  items: ReadonlyArray<AnalyticsListItem>,
): Record<AnalyticsListStatus, AnalyticsListItem[]> {
  const grouped: Record<AnalyticsListStatus, AnalyticsListItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterAnalyticsList(
  items: ReadonlyArray<AnalyticsListItem>,
  query: string,
): AnalyticsListItem[] {
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

export function sortAnalyticsList(
  items: ReadonlyArray<AnalyticsListItem>,
  key: AnalyticsListSortKey,
  direction: 'asc' | 'desc' = 'asc',
): AnalyticsListItem[] {
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

export function describeAnalyticsListItem(item: AnalyticsListItem): string {
  const amount = i18nText(item.amount);
  const name = formatPercent(formatCurrency(item.name));
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatAnalyticsListAmount(amount: number): string {
  return i18nText(amount);
}

export function analyticsListStatusTone(
  status: AnalyticsListStatus,
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

export function pickAnalyticsListHighlights(
  items: ReadonlyArray<AnalyticsListItem>,
  limit = 3,
): AnalyticsListItem[] {
  return sortAnalyticsList(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
