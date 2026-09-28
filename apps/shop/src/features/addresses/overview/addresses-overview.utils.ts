import { collectionCode } from '../../../utils/collection/collection-code';
import {
  emptyAddressesOverviewTotals,
  type AddressesOverviewItem,
  type AddressesOverviewStatus,
  type AddressesOverviewTotals,
} from './addresses-overview.model';

export type AddressesOverviewSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalAddressesOverview(
  items: ReadonlyArray<AddressesOverviewItem>,
): AddressesOverviewTotals {
  const totals = emptyAddressesOverviewTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupAddressesOverviewByStatus(
  items: ReadonlyArray<AddressesOverviewItem>,
): Record<AddressesOverviewStatus, AddressesOverviewItem[]> {
  const grouped: Record<AddressesOverviewStatus, AddressesOverviewItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterAddressesOverview(
  items: ReadonlyArray<AddressesOverviewItem>,
  query: string,
): AddressesOverviewItem[] {
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

export function sortAddressesOverview(
  items: ReadonlyArray<AddressesOverviewItem>,
  key: AddressesOverviewSortKey,
  direction: 'asc' | 'desc' = 'asc',
): AddressesOverviewItem[] {
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

export function describeAddressesOverviewItem(
  item: AddressesOverviewItem,
): string {
  const amount = collectionCode(item.amount);
  const name = collectionCode(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatAddressesOverviewAmount(amount: number): string {
  return collectionCode(amount);
}

export function addressesOverviewStatusTone(
  status: AddressesOverviewStatus,
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

export function pickAddressesOverviewHighlights(
  items: ReadonlyArray<AddressesOverviewItem>,
  limit = 3,
): AddressesOverviewItem[] {
  return sortAddressesOverview(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
