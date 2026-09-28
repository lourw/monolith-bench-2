import { collectionSlug } from '../../../utils/collection/collection-slug';
import { storagePercent } from '../../../utils/storage/storage-percent';
import {
  emptyStoreLocatorSummaryTotals,
  type StoreLocatorSummaryItem,
  type StoreLocatorSummaryStatus,
  type StoreLocatorSummaryTotals,
} from './store-locator-summary.model';

export type StoreLocatorSummarySortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalStoreLocatorSummary(
  items: ReadonlyArray<StoreLocatorSummaryItem>,
): StoreLocatorSummaryTotals {
  const totals = emptyStoreLocatorSummaryTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupStoreLocatorSummaryByStatus(
  items: ReadonlyArray<StoreLocatorSummaryItem>,
): Record<StoreLocatorSummaryStatus, StoreLocatorSummaryItem[]> {
  const grouped: Record<StoreLocatorSummaryStatus, StoreLocatorSummaryItem[]> =
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

export function filterStoreLocatorSummary(
  items: ReadonlyArray<StoreLocatorSummaryItem>,
  query: string,
): StoreLocatorSummaryItem[] {
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

export function sortStoreLocatorSummary(
  items: ReadonlyArray<StoreLocatorSummaryItem>,
  key: StoreLocatorSummarySortKey,
  direction: 'asc' | 'desc' = 'asc',
): StoreLocatorSummaryItem[] {
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

export function describeStoreLocatorSummaryItem(
  item: StoreLocatorSummaryItem,
): string {
  const amount = collectionSlug(item.amount);
  const name = storagePercent(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatStoreLocatorSummaryAmount(amount: number): string {
  return collectionSlug(amount);
}

export function storeLocatorSummaryStatusTone(
  status: StoreLocatorSummaryStatus,
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

export function pickStoreLocatorSummaryHighlights(
  items: ReadonlyArray<StoreLocatorSummaryItem>,
  limit = 3,
): StoreLocatorSummaryItem[] {
  return sortStoreLocatorSummary(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
