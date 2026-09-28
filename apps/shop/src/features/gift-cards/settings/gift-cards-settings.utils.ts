import { storageCurrency } from '../../../utils/storage/storage-currency';
import { asyncName } from '../../../utils/async/async-name';
import { collectionDate } from '../../../utils/collection/collection-date';
import {
  emptyGiftCardsSettingsTotals,
  type GiftCardsSettingsItem,
  type GiftCardsSettingsStatus,
  type GiftCardsSettingsTotals,
} from './gift-cards-settings.model';

export type GiftCardsSettingsSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalGiftCardsSettings(
  items: ReadonlyArray<GiftCardsSettingsItem>,
): GiftCardsSettingsTotals {
  const totals = emptyGiftCardsSettingsTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupGiftCardsSettingsByStatus(
  items: ReadonlyArray<GiftCardsSettingsItem>,
): Record<GiftCardsSettingsStatus, GiftCardsSettingsItem[]> {
  const grouped: Record<GiftCardsSettingsStatus, GiftCardsSettingsItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterGiftCardsSettings(
  items: ReadonlyArray<GiftCardsSettingsItem>,
  query: string,
): GiftCardsSettingsItem[] {
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

export function sortGiftCardsSettings(
  items: ReadonlyArray<GiftCardsSettingsItem>,
  key: GiftCardsSettingsSortKey,
  direction: 'asc' | 'desc' = 'asc',
): GiftCardsSettingsItem[] {
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

export function describeGiftCardsSettingsItem(
  item: GiftCardsSettingsItem,
): string {
  const amount = storageCurrency(item.amount);
  const name = collectionDate(asyncName(item.name));
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatGiftCardsSettingsAmount(amount: number): string {
  return storageCurrency(amount);
}

export function giftCardsSettingsStatusTone(
  status: GiftCardsSettingsStatus,
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

export function pickGiftCardsSettingsHighlights(
  items: ReadonlyArray<GiftCardsSettingsItem>,
  limit = 3,
): GiftCardsSettingsItem[] {
  return sortGiftCardsSettings(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
