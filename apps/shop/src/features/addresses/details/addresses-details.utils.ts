import { collectionCode } from '../../../utils/collection/collection-code';
import { formatPhone } from '../../../utils/format/format-phone';
import { asyncCurrency } from '../../../utils/async/async-currency';
import {
  emptyAddressesDetailsTotals,
  type AddressesDetailsItem,
  type AddressesDetailsStatus,
  type AddressesDetailsTotals,
} from './addresses-details.model';

export type AddressesDetailsSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalAddressesDetails(
  items: ReadonlyArray<AddressesDetailsItem>,
): AddressesDetailsTotals {
  const totals = emptyAddressesDetailsTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupAddressesDetailsByStatus(
  items: ReadonlyArray<AddressesDetailsItem>,
): Record<AddressesDetailsStatus, AddressesDetailsItem[]> {
  const grouped: Record<AddressesDetailsStatus, AddressesDetailsItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterAddressesDetails(
  items: ReadonlyArray<AddressesDetailsItem>,
  query: string,
): AddressesDetailsItem[] {
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

export function sortAddressesDetails(
  items: ReadonlyArray<AddressesDetailsItem>,
  key: AddressesDetailsSortKey,
  direction: 'asc' | 'desc' = 'asc',
): AddressesDetailsItem[] {
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

export function describeAddressesDetailsItem(
  item: AddressesDetailsItem,
): string {
  const amount = collectionCode(item.amount);
  const name = asyncCurrency(formatPhone(item.name));
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatAddressesDetailsAmount(amount: number): string {
  return collectionCode(amount);
}

export function addressesDetailsStatusTone(
  status: AddressesDetailsStatus,
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

export function pickAddressesDetailsHighlights(
  items: ReadonlyArray<AddressesDetailsItem>,
  limit = 3,
): AddressesDetailsItem[] {
  return sortAddressesDetails(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
