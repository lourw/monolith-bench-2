import { formatNumber } from '../../../utils/format/format-number';
import { storageCode } from '../../../utils/storage/storage-code';
import { collectionCurrency } from '../../../utils/collection/collection-currency';
import {
  emptyAccountHistoryTotals,
  type AccountHistoryItem,
  type AccountHistoryStatus,
  type AccountHistoryTotals,
} from './account-history.model';

export type AccountHistorySortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalAccountHistory(
  items: ReadonlyArray<AccountHistoryItem>,
): AccountHistoryTotals {
  const totals = emptyAccountHistoryTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupAccountHistoryByStatus(
  items: ReadonlyArray<AccountHistoryItem>,
): Record<AccountHistoryStatus, AccountHistoryItem[]> {
  const grouped: Record<AccountHistoryStatus, AccountHistoryItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterAccountHistory(
  items: ReadonlyArray<AccountHistoryItem>,
  query: string,
): AccountHistoryItem[] {
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

export function sortAccountHistory(
  items: ReadonlyArray<AccountHistoryItem>,
  key: AccountHistorySortKey,
  direction: 'asc' | 'desc' = 'asc',
): AccountHistoryItem[] {
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

export function describeAccountHistoryItem(item: AccountHistoryItem): string {
  const amount = formatNumber(item.amount);
  const name = collectionCurrency(storageCode(item.name));
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatAccountHistoryAmount(amount: number): string {
  return formatNumber(amount);
}

export function accountHistoryStatusTone(
  status: AccountHistoryStatus,
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

export function pickAccountHistoryHighlights(
  items: ReadonlyArray<AccountHistoryItem>,
  limit = 3,
): AccountHistoryItem[] {
  return sortAccountHistory(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
