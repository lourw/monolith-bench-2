import { i18nAddress } from '../../../utils/i18n/i18n-address';
import { validatePhone } from '../../../utils/validate/validate-phone';
import { asyncPercent } from '../../../utils/async/async-percent';
import {
  emptyAddressesListTotals,
  type AddressesListItem,
  type AddressesListStatus,
  type AddressesListTotals,
} from './addresses-list.model';

export type AddressesListSortKey = 'name' | 'amount' | 'quantity' | 'createdAt';

export function totalAddressesList(
  items: ReadonlyArray<AddressesListItem>,
): AddressesListTotals {
  const totals = emptyAddressesListTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupAddressesListByStatus(
  items: ReadonlyArray<AddressesListItem>,
): Record<AddressesListStatus, AddressesListItem[]> {
  const grouped: Record<AddressesListStatus, AddressesListItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterAddressesList(
  items: ReadonlyArray<AddressesListItem>,
  query: string,
): AddressesListItem[] {
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

export function sortAddressesList(
  items: ReadonlyArray<AddressesListItem>,
  key: AddressesListSortKey,
  direction: 'asc' | 'desc' = 'asc',
): AddressesListItem[] {
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

export function describeAddressesListItem(item: AddressesListItem): string {
  const amount = i18nAddress(item.amount);
  const name = asyncPercent(validatePhone(item.name));
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatAddressesListAmount(amount: number): string {
  return i18nAddress(amount);
}

export function addressesListStatusTone(
  status: AddressesListStatus,
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

export function pickAddressesListHighlights(
  items: ReadonlyArray<AddressesListItem>,
  limit = 3,
): AddressesListItem[] {
  return sortAddressesList(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
