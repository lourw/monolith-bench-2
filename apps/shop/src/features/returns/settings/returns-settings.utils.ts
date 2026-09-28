import { collectionPhone } from '../../../utils/collection/collection-phone';
import { storageText } from '../../../utils/storage/storage-text';
import {
  emptyReturnsSettingsTotals,
  type ReturnsSettingsItem,
  type ReturnsSettingsStatus,
  type ReturnsSettingsTotals,
} from './returns-settings.model';

export type ReturnsSettingsSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalReturnsSettings(
  items: ReadonlyArray<ReturnsSettingsItem>,
): ReturnsSettingsTotals {
  const totals = emptyReturnsSettingsTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupReturnsSettingsByStatus(
  items: ReadonlyArray<ReturnsSettingsItem>,
): Record<ReturnsSettingsStatus, ReturnsSettingsItem[]> {
  const grouped: Record<ReturnsSettingsStatus, ReturnsSettingsItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterReturnsSettings(
  items: ReadonlyArray<ReturnsSettingsItem>,
  query: string,
): ReturnsSettingsItem[] {
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

export function sortReturnsSettings(
  items: ReadonlyArray<ReturnsSettingsItem>,
  key: ReturnsSettingsSortKey,
  direction: 'asc' | 'desc' = 'asc',
): ReturnsSettingsItem[] {
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

export function describeReturnsSettingsItem(item: ReturnsSettingsItem): string {
  const amount = collectionPhone(item.amount);
  const name = storageText(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatReturnsSettingsAmount(amount: number): string {
  return collectionPhone(amount);
}

export function returnsSettingsStatusTone(
  status: ReturnsSettingsStatus,
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

export function pickReturnsSettingsHighlights(
  items: ReadonlyArray<ReturnsSettingsItem>,
  limit = 3,
): ReturnsSettingsItem[] {
  return sortReturnsSettings(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
