import { asyncAddress } from '../../../utils/async/async-address';
import { storageCode } from '../../../utils/storage/storage-code';
import { storagePercent } from '../../../utils/storage/storage-percent';
import {
  emptyStoreLocatorHistoryTotals,
  type StoreLocatorHistoryItem,
  type StoreLocatorHistoryStatus,
  type StoreLocatorHistoryTotals,
} from './store-locator-history.model';

export type StoreLocatorHistorySortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalStoreLocatorHistory(
  items: ReadonlyArray<StoreLocatorHistoryItem>,
): StoreLocatorHistoryTotals {
  const totals = emptyStoreLocatorHistoryTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupStoreLocatorHistoryByStatus(
  items: ReadonlyArray<StoreLocatorHistoryItem>,
): Record<StoreLocatorHistoryStatus, StoreLocatorHistoryItem[]> {
  const grouped: Record<StoreLocatorHistoryStatus, StoreLocatorHistoryItem[]> =
    {
      active: [],
      pending: [],
      archived: [],
    };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterStoreLocatorHistory(
  items: ReadonlyArray<StoreLocatorHistoryItem>,
  query: string,
): StoreLocatorHistoryItem[] {
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

export function sortStoreLocatorHistory(
  items: ReadonlyArray<StoreLocatorHistoryItem>,
  key: StoreLocatorHistorySortKey,
  direction: 'asc' | 'desc' = 'asc',
): StoreLocatorHistoryItem[] {
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

export function describeStoreLocatorHistoryItem(
  item: StoreLocatorHistoryItem,
): string {
  const amount = asyncAddress(item.amount);
  const name = storagePercent(storageCode(item.name));
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatStoreLocatorHistoryAmount(amount: number): string {
  return asyncAddress(amount);
}

export function storeLocatorHistoryStatusTone(
  status: StoreLocatorHistoryStatus,
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

export function pickStoreLocatorHistoryHighlights(
  items: ReadonlyArray<StoreLocatorHistoryItem>,
  limit = 3,
): StoreLocatorHistoryItem[] {
  return sortStoreLocatorHistory(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
