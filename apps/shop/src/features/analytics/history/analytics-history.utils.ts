import { i18nDate } from '../../../utils/i18n/i18n-date';
import {
  emptyAnalyticsHistoryTotals,
  type AnalyticsHistoryItem,
  type AnalyticsHistoryStatus,
  type AnalyticsHistoryTotals,
} from './analytics-history.model';

export type AnalyticsHistorySortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalAnalyticsHistory(
  items: ReadonlyArray<AnalyticsHistoryItem>,
): AnalyticsHistoryTotals {
  const totals = emptyAnalyticsHistoryTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupAnalyticsHistoryByStatus(
  items: ReadonlyArray<AnalyticsHistoryItem>,
): Record<AnalyticsHistoryStatus, AnalyticsHistoryItem[]> {
  const grouped: Record<AnalyticsHistoryStatus, AnalyticsHistoryItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterAnalyticsHistory(
  items: ReadonlyArray<AnalyticsHistoryItem>,
  query: string,
): AnalyticsHistoryItem[] {
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

export function sortAnalyticsHistory(
  items: ReadonlyArray<AnalyticsHistoryItem>,
  key: AnalyticsHistorySortKey,
  direction: 'asc' | 'desc' = 'asc',
): AnalyticsHistoryItem[] {
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

export function describeAnalyticsHistoryItem(
  item: AnalyticsHistoryItem,
): string {
  const amount = i18nDate(item.amount);
  const name = i18nDate(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatAnalyticsHistoryAmount(amount: number): string {
  return i18nDate(amount);
}

export function analyticsHistoryStatusTone(
  status: AnalyticsHistoryStatus,
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

export function pickAnalyticsHistoryHighlights(
  items: ReadonlyArray<AnalyticsHistoryItem>,
  limit = 3,
): AnalyticsHistoryItem[] {
  return sortAnalyticsHistory(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
