import { collectionName } from '../../../utils/collection/collection-name';
import {
  emptyCartSettingsTotals,
  type CartSettingsItem,
  type CartSettingsStatus,
  type CartSettingsTotals,
} from './cart-settings.model';

export type CartSettingsSortKey = 'name' | 'amount' | 'quantity' | 'createdAt';

export function totalCartSettings(
  items: ReadonlyArray<CartSettingsItem>,
): CartSettingsTotals {
  const totals = emptyCartSettingsTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupCartSettingsByStatus(
  items: ReadonlyArray<CartSettingsItem>,
): Record<CartSettingsStatus, CartSettingsItem[]> {
  const grouped: Record<CartSettingsStatus, CartSettingsItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterCartSettings(
  items: ReadonlyArray<CartSettingsItem>,
  query: string,
): CartSettingsItem[] {
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

export function sortCartSettings(
  items: ReadonlyArray<CartSettingsItem>,
  key: CartSettingsSortKey,
  direction: 'asc' | 'desc' = 'asc',
): CartSettingsItem[] {
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

export function describeCartSettingsItem(item: CartSettingsItem): string {
  const amount = collectionName(item.amount);
  const name = collectionName(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatCartSettingsAmount(amount: number): string {
  return collectionName(amount);
}

export function cartSettingsStatusTone(
  status: CartSettingsStatus,
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

export function pickCartSettingsHighlights(
  items: ReadonlyArray<CartSettingsItem>,
  limit = 3,
): CartSettingsItem[] {
  return sortCartSettings(items, 'amount', 'desc').slice(0, Math.max(0, limit));
}
