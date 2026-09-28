import { mathName } from '../../../utils/math/math-name';
import { storageAddress } from '../../../utils/storage/storage-address';
import { asyncAddress } from '../../../utils/async/async-address';
import {
  emptyAnalyticsSummaryTotals,
  type AnalyticsSummaryItem,
  type AnalyticsSummaryStatus,
  type AnalyticsSummaryTotals,
} from './analytics-summary.model';

export type AnalyticsSummarySortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalAnalyticsSummary(
  items: ReadonlyArray<AnalyticsSummaryItem>,
): AnalyticsSummaryTotals {
  const totals = emptyAnalyticsSummaryTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupAnalyticsSummaryByStatus(
  items: ReadonlyArray<AnalyticsSummaryItem>,
): Record<AnalyticsSummaryStatus, AnalyticsSummaryItem[]> {
  const grouped: Record<AnalyticsSummaryStatus, AnalyticsSummaryItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterAnalyticsSummary(
  items: ReadonlyArray<AnalyticsSummaryItem>,
  query: string,
): AnalyticsSummaryItem[] {
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

export function sortAnalyticsSummary(
  items: ReadonlyArray<AnalyticsSummaryItem>,
  key: AnalyticsSummarySortKey,
  direction: 'asc' | 'desc' = 'asc',
): AnalyticsSummaryItem[] {
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

export function describeAnalyticsSummaryItem(
  item: AnalyticsSummaryItem,
): string {
  const amount = mathName(item.amount);
  const name = asyncAddress(storageAddress(item.name));
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatAnalyticsSummaryAmount(amount: number): string {
  return mathName(amount);
}

export function analyticsSummaryStatusTone(
  status: AnalyticsSummaryStatus,
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

export function pickAnalyticsSummaryHighlights(
  items: ReadonlyArray<AnalyticsSummaryItem>,
  limit = 3,
): AnalyticsSummaryItem[] {
  return sortAnalyticsSummary(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
