import { storageCode } from '../../../utils/storage/storage-code';
import {
  emptyAddressesSettingsTotals,
  type AddressesSettingsItem,
  type AddressesSettingsStatus,
  type AddressesSettingsTotals,
} from './addresses-settings.model';

export type AddressesSettingsSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalAddressesSettings(
  items: ReadonlyArray<AddressesSettingsItem>,
): AddressesSettingsTotals {
  const totals = emptyAddressesSettingsTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupAddressesSettingsByStatus(
  items: ReadonlyArray<AddressesSettingsItem>,
): Record<AddressesSettingsStatus, AddressesSettingsItem[]> {
  const grouped: Record<AddressesSettingsStatus, AddressesSettingsItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterAddressesSettings(
  items: ReadonlyArray<AddressesSettingsItem>,
  query: string,
): AddressesSettingsItem[] {
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

export function sortAddressesSettings(
  items: ReadonlyArray<AddressesSettingsItem>,
  key: AddressesSettingsSortKey,
  direction: 'asc' | 'desc' = 'asc',
): AddressesSettingsItem[] {
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

export function describeAddressesSettingsItem(
  item: AddressesSettingsItem,
): string {
  const amount = storageCode(item.amount);
  const name = storageCode(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatAddressesSettingsAmount(amount: number): string {
  return storageCode(amount);
}

export function addressesSettingsStatusTone(
  status: AddressesSettingsStatus,
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

export function pickAddressesSettingsHighlights(
  items: ReadonlyArray<AddressesSettingsItem>,
  limit = 3,
): AddressesSettingsItem[] {
  return sortAddressesSettings(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
