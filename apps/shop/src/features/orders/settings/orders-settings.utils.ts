import { asyncAddress } from '../../../utils/async/async-address';
import { collectionName } from '../../../utils/collection/collection-name';
import {
  emptyOrdersSettingsTotals,
  type OrdersSettingsItem,
  type OrdersSettingsStatus,
  type OrdersSettingsTotals,
} from './orders-settings.model';

export type OrdersSettingsSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalOrdersSettings(
  items: ReadonlyArray<OrdersSettingsItem>,
): OrdersSettingsTotals {
  const totals = emptyOrdersSettingsTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupOrdersSettingsByStatus(
  items: ReadonlyArray<OrdersSettingsItem>,
): Record<OrdersSettingsStatus, OrdersSettingsItem[]> {
  const grouped: Record<OrdersSettingsStatus, OrdersSettingsItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterOrdersSettings(
  items: ReadonlyArray<OrdersSettingsItem>,
  query: string,
): OrdersSettingsItem[] {
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

export function sortOrdersSettings(
  items: ReadonlyArray<OrdersSettingsItem>,
  key: OrdersSettingsSortKey,
  direction: 'asc' | 'desc' = 'asc',
): OrdersSettingsItem[] {
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

export function describeOrdersSettingsItem(item: OrdersSettingsItem): string {
  const amount = asyncAddress(item.amount);
  const name = collectionName(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatOrdersSettingsAmount(amount: number): string {
  return asyncAddress(amount);
}

export function ordersSettingsStatusTone(
  status: OrdersSettingsStatus,
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

export function pickOrdersSettingsHighlights(
  items: ReadonlyArray<OrdersSettingsItem>,
  limit = 3,
): OrdersSettingsItem[] {
  return sortOrdersSettings(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
