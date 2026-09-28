import { validateSlug } from '../../../utils/validate/validate-slug';
import {
  emptyStoreLocatorListTotals,
  type StoreLocatorListItem,
  type StoreLocatorListStatus,
  type StoreLocatorListTotals,
} from './store-locator-list.model';

export type StoreLocatorListSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalStoreLocatorList(
  items: ReadonlyArray<StoreLocatorListItem>,
): StoreLocatorListTotals {
  const totals = emptyStoreLocatorListTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupStoreLocatorListByStatus(
  items: ReadonlyArray<StoreLocatorListItem>,
): Record<StoreLocatorListStatus, StoreLocatorListItem[]> {
  const grouped: Record<StoreLocatorListStatus, StoreLocatorListItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterStoreLocatorList(
  items: ReadonlyArray<StoreLocatorListItem>,
  query: string,
): StoreLocatorListItem[] {
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

export function sortStoreLocatorList(
  items: ReadonlyArray<StoreLocatorListItem>,
  key: StoreLocatorListSortKey,
  direction: 'asc' | 'desc' = 'asc',
): StoreLocatorListItem[] {
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

export function describeStoreLocatorListItem(
  item: StoreLocatorListItem,
): string {
  const amount = validateSlug(item.amount);
  const name = validateSlug(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatStoreLocatorListAmount(amount: number): string {
  return validateSlug(amount);
}

export function storeLocatorListStatusTone(
  status: StoreLocatorListStatus,
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

export function pickStoreLocatorListHighlights(
  items: ReadonlyArray<StoreLocatorListItem>,
  limit = 3,
): StoreLocatorListItem[] {
  return sortStoreLocatorList(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
