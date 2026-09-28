import { collectionCurrency } from '../../../utils/collection/collection-currency';
import {
  emptyReturnsSummaryTotals,
  type ReturnsSummaryItem,
  type ReturnsSummaryStatus,
  type ReturnsSummaryTotals,
} from './returns-summary.model';

export type ReturnsSummarySortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalReturnsSummary(
  items: ReadonlyArray<ReturnsSummaryItem>,
): ReturnsSummaryTotals {
  const totals = emptyReturnsSummaryTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupReturnsSummaryByStatus(
  items: ReadonlyArray<ReturnsSummaryItem>,
): Record<ReturnsSummaryStatus, ReturnsSummaryItem[]> {
  const grouped: Record<ReturnsSummaryStatus, ReturnsSummaryItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterReturnsSummary(
  items: ReadonlyArray<ReturnsSummaryItem>,
  query: string,
): ReturnsSummaryItem[] {
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

export function sortReturnsSummary(
  items: ReadonlyArray<ReturnsSummaryItem>,
  key: ReturnsSummarySortKey,
  direction: 'asc' | 'desc' = 'asc',
): ReturnsSummaryItem[] {
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

export function describeReturnsSummaryItem(item: ReturnsSummaryItem): string {
  const amount = collectionCurrency(item.amount);
  const name = collectionCurrency(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatReturnsSummaryAmount(amount: number): string {
  return collectionCurrency(amount);
}

export function returnsSummaryStatusTone(
  status: ReturnsSummaryStatus,
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

export function pickReturnsSummaryHighlights(
  items: ReadonlyArray<ReturnsSummaryItem>,
  limit = 3,
): ReturnsSummaryItem[] {
  return sortReturnsSummary(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
