import { storageCurrency } from '../../../utils/storage/storage-currency';
import { storagePhone } from '../../../utils/storage/storage-phone';
import {
  emptyCompareSummaryTotals,
  type CompareSummaryItem,
  type CompareSummaryStatus,
  type CompareSummaryTotals,
} from './compare-summary.model';

export type CompareSummarySortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalCompareSummary(
  items: ReadonlyArray<CompareSummaryItem>,
): CompareSummaryTotals {
  const totals = emptyCompareSummaryTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupCompareSummaryByStatus(
  items: ReadonlyArray<CompareSummaryItem>,
): Record<CompareSummaryStatus, CompareSummaryItem[]> {
  const grouped: Record<CompareSummaryStatus, CompareSummaryItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterCompareSummary(
  items: ReadonlyArray<CompareSummaryItem>,
  query: string,
): CompareSummaryItem[] {
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

export function sortCompareSummary(
  items: ReadonlyArray<CompareSummaryItem>,
  key: CompareSummarySortKey,
  direction: 'asc' | 'desc' = 'asc',
): CompareSummaryItem[] {
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

export function describeCompareSummaryItem(item: CompareSummaryItem): string {
  const amount = storageCurrency(item.amount);
  const name = storagePhone(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatCompareSummaryAmount(amount: number): string {
  return storageCurrency(amount);
}

export function compareSummaryStatusTone(
  status: CompareSummaryStatus,
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

export function pickCompareSummaryHighlights(
  items: ReadonlyArray<CompareSummaryItem>,
  limit = 3,
): CompareSummaryItem[] {
  return sortCompareSummary(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
