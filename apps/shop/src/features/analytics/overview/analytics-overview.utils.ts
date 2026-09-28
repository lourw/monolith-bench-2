import { asyncNumber } from '../../../utils/async/async-number';
import { formatText } from '../../../utils/format/format-text';
import { asyncCode } from '../../../utils/async/async-code';
import {
  emptyAnalyticsOverviewTotals,
  type AnalyticsOverviewItem,
  type AnalyticsOverviewStatus,
  type AnalyticsOverviewTotals,
} from './analytics-overview.model';

export type AnalyticsOverviewSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalAnalyticsOverview(
  items: ReadonlyArray<AnalyticsOverviewItem>,
): AnalyticsOverviewTotals {
  const totals = emptyAnalyticsOverviewTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupAnalyticsOverviewByStatus(
  items: ReadonlyArray<AnalyticsOverviewItem>,
): Record<AnalyticsOverviewStatus, AnalyticsOverviewItem[]> {
  const grouped: Record<AnalyticsOverviewStatus, AnalyticsOverviewItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterAnalyticsOverview(
  items: ReadonlyArray<AnalyticsOverviewItem>,
  query: string,
): AnalyticsOverviewItem[] {
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

export function sortAnalyticsOverview(
  items: ReadonlyArray<AnalyticsOverviewItem>,
  key: AnalyticsOverviewSortKey,
  direction: 'asc' | 'desc' = 'asc',
): AnalyticsOverviewItem[] {
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

export function describeAnalyticsOverviewItem(
  item: AnalyticsOverviewItem,
): string {
  const amount = asyncNumber(item.amount);
  const name = asyncCode(formatText(item.name));
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatAnalyticsOverviewAmount(amount: number): string {
  return asyncNumber(amount);
}

export function analyticsOverviewStatusTone(
  status: AnalyticsOverviewStatus,
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

export function pickAnalyticsOverviewHighlights(
  items: ReadonlyArray<AnalyticsOverviewItem>,
  limit = 3,
): AnalyticsOverviewItem[] {
  return sortAnalyticsOverview(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
