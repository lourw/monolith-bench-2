import { i18nName } from '../../../utils/i18n/i18n-name';
import {
  emptyShippingSettingsTotals,
  type ShippingSettingsItem,
  type ShippingSettingsStatus,
  type ShippingSettingsTotals,
} from './shipping-settings.model';

export type ShippingSettingsSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalShippingSettings(
  items: ReadonlyArray<ShippingSettingsItem>,
): ShippingSettingsTotals {
  const totals = emptyShippingSettingsTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupShippingSettingsByStatus(
  items: ReadonlyArray<ShippingSettingsItem>,
): Record<ShippingSettingsStatus, ShippingSettingsItem[]> {
  const grouped: Record<ShippingSettingsStatus, ShippingSettingsItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterShippingSettings(
  items: ReadonlyArray<ShippingSettingsItem>,
  query: string,
): ShippingSettingsItem[] {
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

export function sortShippingSettings(
  items: ReadonlyArray<ShippingSettingsItem>,
  key: ShippingSettingsSortKey,
  direction: 'asc' | 'desc' = 'asc',
): ShippingSettingsItem[] {
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

export function describeShippingSettingsItem(
  item: ShippingSettingsItem,
): string {
  const amount = i18nName(item.amount);
  const name = i18nName(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatShippingSettingsAmount(amount: number): string {
  return i18nName(amount);
}

export function shippingSettingsStatusTone(
  status: ShippingSettingsStatus,
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

export function pickShippingSettingsHighlights(
  items: ReadonlyArray<ShippingSettingsItem>,
  limit = 3,
): ShippingSettingsItem[] {
  return sortShippingSettings(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
