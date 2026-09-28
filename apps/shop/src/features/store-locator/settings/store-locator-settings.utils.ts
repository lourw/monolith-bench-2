import { formatDate } from '../../../utils/format/format-date';
import { validateSlug } from '../../../utils/validate/validate-slug';
import {
  emptyStoreLocatorSettingsTotals,
  type StoreLocatorSettingsItem,
  type StoreLocatorSettingsStatus,
  type StoreLocatorSettingsTotals,
} from './store-locator-settings.model';

export type StoreLocatorSettingsSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalStoreLocatorSettings(
  items: ReadonlyArray<StoreLocatorSettingsItem>,
): StoreLocatorSettingsTotals {
  const totals = emptyStoreLocatorSettingsTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupStoreLocatorSettingsByStatus(
  items: ReadonlyArray<StoreLocatorSettingsItem>,
): Record<StoreLocatorSettingsStatus, StoreLocatorSettingsItem[]> {
  const grouped: Record<
    StoreLocatorSettingsStatus,
    StoreLocatorSettingsItem[]
  > = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterStoreLocatorSettings(
  items: ReadonlyArray<StoreLocatorSettingsItem>,
  query: string,
): StoreLocatorSettingsItem[] {
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

export function sortStoreLocatorSettings(
  items: ReadonlyArray<StoreLocatorSettingsItem>,
  key: StoreLocatorSettingsSortKey,
  direction: 'asc' | 'desc' = 'asc',
): StoreLocatorSettingsItem[] {
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

export function describeStoreLocatorSettingsItem(
  item: StoreLocatorSettingsItem,
): string {
  const amount = formatDate(item.amount);
  const name = validateSlug(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatStoreLocatorSettingsAmount(amount: number): string {
  return formatDate(amount);
}

export function storeLocatorSettingsStatusTone(
  status: StoreLocatorSettingsStatus,
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

export function pickStoreLocatorSettingsHighlights(
  items: ReadonlyArray<StoreLocatorSettingsItem>,
  limit = 3,
): StoreLocatorSettingsItem[] {
  return sortStoreLocatorSettings(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
