import { asyncText } from '../../../utils/async/async-text';
import {
  emptySizingHistoryTotals,
  type SizingHistoryItem,
  type SizingHistoryStatus,
  type SizingHistoryTotals,
} from './sizing-history.model';

export type SizingHistorySortKey = 'name' | 'amount' | 'quantity' | 'createdAt';

export function totalSizingHistory(
  items: ReadonlyArray<SizingHistoryItem>,
): SizingHistoryTotals {
  const totals = emptySizingHistoryTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupSizingHistoryByStatus(
  items: ReadonlyArray<SizingHistoryItem>,
): Record<SizingHistoryStatus, SizingHistoryItem[]> {
  const grouped: Record<SizingHistoryStatus, SizingHistoryItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterSizingHistory(
  items: ReadonlyArray<SizingHistoryItem>,
  query: string,
): SizingHistoryItem[] {
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

export function sortSizingHistory(
  items: ReadonlyArray<SizingHistoryItem>,
  key: SizingHistorySortKey,
  direction: 'asc' | 'desc' = 'asc',
): SizingHistoryItem[] {
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

export function describeSizingHistoryItem(item: SizingHistoryItem): string {
  const amount = asyncText(item.amount);
  const name = asyncText(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatSizingHistoryAmount(amount: number): string {
  return asyncText(amount);
}

export function sizingHistoryStatusTone(
  status: SizingHistoryStatus,
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

export function pickSizingHistoryHighlights(
  items: ReadonlyArray<SizingHistoryItem>,
  limit = 3,
): SizingHistoryItem[] {
  return sortSizingHistory(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
