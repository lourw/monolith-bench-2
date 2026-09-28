import { validateAddress } from '../../../utils/validate/validate-address';
import {
  emptyAddressesHistoryTotals,
  type AddressesHistoryItem,
  type AddressesHistoryStatus,
  type AddressesHistoryTotals,
} from './addresses-history.model';

export type AddressesHistorySortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalAddressesHistory(
  items: ReadonlyArray<AddressesHistoryItem>,
): AddressesHistoryTotals {
  const totals = emptyAddressesHistoryTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupAddressesHistoryByStatus(
  items: ReadonlyArray<AddressesHistoryItem>,
): Record<AddressesHistoryStatus, AddressesHistoryItem[]> {
  const grouped: Record<AddressesHistoryStatus, AddressesHistoryItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterAddressesHistory(
  items: ReadonlyArray<AddressesHistoryItem>,
  query: string,
): AddressesHistoryItem[] {
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

export function sortAddressesHistory(
  items: ReadonlyArray<AddressesHistoryItem>,
  key: AddressesHistorySortKey,
  direction: 'asc' | 'desc' = 'asc',
): AddressesHistoryItem[] {
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

export function describeAddressesHistoryItem(
  item: AddressesHistoryItem,
): string {
  const amount = validateAddress(item.amount);
  const name = validateAddress(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatAddressesHistoryAmount(amount: number): string {
  return validateAddress(amount);
}

export function addressesHistoryStatusTone(
  status: AddressesHistoryStatus,
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

export function pickAddressesHistoryHighlights(
  items: ReadonlyArray<AddressesHistoryItem>,
  limit = 3,
): AddressesHistoryItem[] {
  return sortAddressesHistory(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
