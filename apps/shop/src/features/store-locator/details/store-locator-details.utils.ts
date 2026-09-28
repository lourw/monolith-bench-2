import { collectionCurrency } from '../../../utils/collection/collection-currency';
import { mathText } from '../../../utils/math/math-text';
import { asyncText } from '../../../utils/async/async-text';
import {
  emptyStoreLocatorDetailsTotals,
  type StoreLocatorDetailsItem,
  type StoreLocatorDetailsStatus,
  type StoreLocatorDetailsTotals,
} from './store-locator-details.model';

export type StoreLocatorDetailsSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalStoreLocatorDetails(
  items: ReadonlyArray<StoreLocatorDetailsItem>,
): StoreLocatorDetailsTotals {
  const totals = emptyStoreLocatorDetailsTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupStoreLocatorDetailsByStatus(
  items: ReadonlyArray<StoreLocatorDetailsItem>,
): Record<StoreLocatorDetailsStatus, StoreLocatorDetailsItem[]> {
  const grouped: Record<StoreLocatorDetailsStatus, StoreLocatorDetailsItem[]> =
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

export function filterStoreLocatorDetails(
  items: ReadonlyArray<StoreLocatorDetailsItem>,
  query: string,
): StoreLocatorDetailsItem[] {
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

export function sortStoreLocatorDetails(
  items: ReadonlyArray<StoreLocatorDetailsItem>,
  key: StoreLocatorDetailsSortKey,
  direction: 'asc' | 'desc' = 'asc',
): StoreLocatorDetailsItem[] {
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

export function describeStoreLocatorDetailsItem(
  item: StoreLocatorDetailsItem,
): string {
  const amount = collectionCurrency(item.amount);
  const name = asyncText(mathText(item.name));
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatStoreLocatorDetailsAmount(amount: number): string {
  return collectionCurrency(amount);
}

export function storeLocatorDetailsStatusTone(
  status: StoreLocatorDetailsStatus,
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

export function pickStoreLocatorDetailsHighlights(
  items: ReadonlyArray<StoreLocatorDetailsItem>,
  limit = 3,
): StoreLocatorDetailsItem[] {
  return sortStoreLocatorDetails(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
