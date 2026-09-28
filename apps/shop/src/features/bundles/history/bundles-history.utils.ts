import { collectionCurrency } from '../../../utils/collection/collection-currency';
import {
  emptyBundlesHistoryTotals,
  type BundlesHistoryItem,
  type BundlesHistoryStatus,
  type BundlesHistoryTotals,
} from './bundles-history.model';

export type BundlesHistorySortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalBundlesHistory(
  items: ReadonlyArray<BundlesHistoryItem>,
): BundlesHistoryTotals {
  const totals = emptyBundlesHistoryTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupBundlesHistoryByStatus(
  items: ReadonlyArray<BundlesHistoryItem>,
): Record<BundlesHistoryStatus, BundlesHistoryItem[]> {
  const grouped: Record<BundlesHistoryStatus, BundlesHistoryItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterBundlesHistory(
  items: ReadonlyArray<BundlesHistoryItem>,
  query: string,
): BundlesHistoryItem[] {
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

export function sortBundlesHistory(
  items: ReadonlyArray<BundlesHistoryItem>,
  key: BundlesHistorySortKey,
  direction: 'asc' | 'desc' = 'asc',
): BundlesHistoryItem[] {
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

export function describeBundlesHistoryItem(item: BundlesHistoryItem): string {
  const amount = collectionCurrency(item.amount);
  const name = collectionCurrency(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatBundlesHistoryAmount(amount: number): string {
  return collectionCurrency(amount);
}

export function bundlesHistoryStatusTone(
  status: BundlesHistoryStatus,
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

export function pickBundlesHistoryHighlights(
  items: ReadonlyArray<BundlesHistoryItem>,
  limit = 3,
): BundlesHistoryItem[] {
  return sortBundlesHistory(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
