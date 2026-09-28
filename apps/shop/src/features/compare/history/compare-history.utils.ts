import { collectionCurrency } from '../../../utils/collection/collection-currency';
import { storageCode } from '../../../utils/storage/storage-code';
import { mathPercent } from '../../../utils/math/math-percent';
import {
  emptyCompareHistoryTotals,
  type CompareHistoryItem,
  type CompareHistoryStatus,
  type CompareHistoryTotals,
} from './compare-history.model';

export type CompareHistorySortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalCompareHistory(
  items: ReadonlyArray<CompareHistoryItem>,
): CompareHistoryTotals {
  const totals = emptyCompareHistoryTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupCompareHistoryByStatus(
  items: ReadonlyArray<CompareHistoryItem>,
): Record<CompareHistoryStatus, CompareHistoryItem[]> {
  const grouped: Record<CompareHistoryStatus, CompareHistoryItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterCompareHistory(
  items: ReadonlyArray<CompareHistoryItem>,
  query: string,
): CompareHistoryItem[] {
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

export function sortCompareHistory(
  items: ReadonlyArray<CompareHistoryItem>,
  key: CompareHistorySortKey,
  direction: 'asc' | 'desc' = 'asc',
): CompareHistoryItem[] {
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

export function describeCompareHistoryItem(item: CompareHistoryItem): string {
  const amount = collectionCurrency(item.amount);
  const name = mathPercent(storageCode(item.name));
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatCompareHistoryAmount(amount: number): string {
  return collectionCurrency(amount);
}

export function compareHistoryStatusTone(
  status: CompareHistoryStatus,
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

export function pickCompareHistoryHighlights(
  items: ReadonlyArray<CompareHistoryItem>,
  limit = 3,
): CompareHistoryItem[] {
  return sortCompareHistory(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
