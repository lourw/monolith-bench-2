import { formatAddress } from '../../../utils/format/format-address';
import {
  emptyInventorySettingsTotals,
  type InventorySettingsItem,
  type InventorySettingsStatus,
  type InventorySettingsTotals,
} from './inventory-settings.model';

export type InventorySettingsSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalInventorySettings(
  items: ReadonlyArray<InventorySettingsItem>,
): InventorySettingsTotals {
  const totals = emptyInventorySettingsTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupInventorySettingsByStatus(
  items: ReadonlyArray<InventorySettingsItem>,
): Record<InventorySettingsStatus, InventorySettingsItem[]> {
  const grouped: Record<InventorySettingsStatus, InventorySettingsItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterInventorySettings(
  items: ReadonlyArray<InventorySettingsItem>,
  query: string,
): InventorySettingsItem[] {
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

export function sortInventorySettings(
  items: ReadonlyArray<InventorySettingsItem>,
  key: InventorySettingsSortKey,
  direction: 'asc' | 'desc' = 'asc',
): InventorySettingsItem[] {
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

export function describeInventorySettingsItem(
  item: InventorySettingsItem,
): string {
  const amount = formatAddress(item.amount);
  const name = formatAddress(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatInventorySettingsAmount(amount: number): string {
  return formatAddress(amount);
}

export function inventorySettingsStatusTone(
  status: InventorySettingsStatus,
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

export function pickInventorySettingsHighlights(
  items: ReadonlyArray<InventorySettingsItem>,
  limit = 3,
): InventorySettingsItem[] {
  return sortInventorySettings(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
