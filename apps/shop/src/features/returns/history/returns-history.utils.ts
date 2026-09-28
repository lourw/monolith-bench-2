import { formatSlug } from '../../../utils/format/format-slug';
import { collectionName } from '../../../utils/collection/collection-name';
import { validateAddress } from '../../../utils/validate/validate-address';
import {
  emptyReturnsHistoryTotals,
  type ReturnsHistoryItem,
  type ReturnsHistoryStatus,
  type ReturnsHistoryTotals,
} from './returns-history.model';

export type ReturnsHistorySortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalReturnsHistory(
  items: ReadonlyArray<ReturnsHistoryItem>,
): ReturnsHistoryTotals {
  const totals = emptyReturnsHistoryTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupReturnsHistoryByStatus(
  items: ReadonlyArray<ReturnsHistoryItem>,
): Record<ReturnsHistoryStatus, ReturnsHistoryItem[]> {
  const grouped: Record<ReturnsHistoryStatus, ReturnsHistoryItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterReturnsHistory(
  items: ReadonlyArray<ReturnsHistoryItem>,
  query: string,
): ReturnsHistoryItem[] {
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

export function sortReturnsHistory(
  items: ReadonlyArray<ReturnsHistoryItem>,
  key: ReturnsHistorySortKey,
  direction: 'asc' | 'desc' = 'asc',
): ReturnsHistoryItem[] {
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

export function describeReturnsHistoryItem(item: ReturnsHistoryItem): string {
  const amount = formatSlug(item.amount);
  const name = validateAddress(collectionName(item.name));
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatReturnsHistoryAmount(amount: number): string {
  return formatSlug(amount);
}

export function returnsHistoryStatusTone(
  status: ReturnsHistoryStatus,
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

export function pickReturnsHistoryHighlights(
  items: ReadonlyArray<ReturnsHistoryItem>,
  limit = 3,
): ReturnsHistoryItem[] {
  return sortReturnsHistory(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
