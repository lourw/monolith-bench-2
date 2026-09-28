import { storageSlug } from '../../../utils/storage/storage-slug';
import {
  emptyWishlistSettingsTotals,
  type WishlistSettingsItem,
  type WishlistSettingsStatus,
  type WishlistSettingsTotals,
} from './wishlist-settings.model';

export type WishlistSettingsSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalWishlistSettings(
  items: ReadonlyArray<WishlistSettingsItem>,
): WishlistSettingsTotals {
  const totals = emptyWishlistSettingsTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupWishlistSettingsByStatus(
  items: ReadonlyArray<WishlistSettingsItem>,
): Record<WishlistSettingsStatus, WishlistSettingsItem[]> {
  const grouped: Record<WishlistSettingsStatus, WishlistSettingsItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterWishlistSettings(
  items: ReadonlyArray<WishlistSettingsItem>,
  query: string,
): WishlistSettingsItem[] {
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

export function sortWishlistSettings(
  items: ReadonlyArray<WishlistSettingsItem>,
  key: WishlistSettingsSortKey,
  direction: 'asc' | 'desc' = 'asc',
): WishlistSettingsItem[] {
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

export function describeWishlistSettingsItem(
  item: WishlistSettingsItem,
): string {
  const amount = storageSlug(item.amount);
  const name = storageSlug(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatWishlistSettingsAmount(amount: number): string {
  return storageSlug(amount);
}

export function wishlistSettingsStatusTone(
  status: WishlistSettingsStatus,
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

export function pickWishlistSettingsHighlights(
  items: ReadonlyArray<WishlistSettingsItem>,
  limit = 3,
): WishlistSettingsItem[] {
  return sortWishlistSettings(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
