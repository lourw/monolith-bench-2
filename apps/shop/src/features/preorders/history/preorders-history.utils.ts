import { collectionNumber } from '../../../utils/collection/collection-number';
import { formatAddress } from '../../../utils/format/format-address';
import {
  emptyPreordersHistoryTotals,
  type PreordersHistoryItem,
  type PreordersHistoryStatus,
  type PreordersHistoryTotals,
} from './preorders-history.model';

export type PreordersHistorySortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalPreordersHistory(
  items: ReadonlyArray<PreordersHistoryItem>,
): PreordersHistoryTotals {
  const totals = emptyPreordersHistoryTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupPreordersHistoryByStatus(
  items: ReadonlyArray<PreordersHistoryItem>,
): Record<PreordersHistoryStatus, PreordersHistoryItem[]> {
  const grouped: Record<PreordersHistoryStatus, PreordersHistoryItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterPreordersHistory(
  items: ReadonlyArray<PreordersHistoryItem>,
  query: string,
): PreordersHistoryItem[] {
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

export function sortPreordersHistory(
  items: ReadonlyArray<PreordersHistoryItem>,
  key: PreordersHistorySortKey,
  direction: 'asc' | 'desc' = 'asc',
): PreordersHistoryItem[] {
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

export function describePreordersHistoryItem(
  item: PreordersHistoryItem,
): string {
  const amount = collectionNumber(item.amount);
  const name = formatAddress(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatPreordersHistoryAmount(amount: number): string {
  return collectionNumber(amount);
}

export function preordersHistoryStatusTone(
  status: PreordersHistoryStatus,
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

export function pickPreordersHistoryHighlights(
  items: ReadonlyArray<PreordersHistoryItem>,
  limit = 3,
): PreordersHistoryItem[] {
  return sortPreordersHistory(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
