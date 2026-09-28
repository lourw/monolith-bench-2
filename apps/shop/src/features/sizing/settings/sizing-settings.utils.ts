import { storageCode } from '../../../utils/storage/storage-code';
import {
  emptySizingSettingsTotals,
  type SizingSettingsItem,
  type SizingSettingsStatus,
  type SizingSettingsTotals,
} from './sizing-settings.model';

export type SizingSettingsSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalSizingSettings(
  items: ReadonlyArray<SizingSettingsItem>,
): SizingSettingsTotals {
  const totals = emptySizingSettingsTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupSizingSettingsByStatus(
  items: ReadonlyArray<SizingSettingsItem>,
): Record<SizingSettingsStatus, SizingSettingsItem[]> {
  const grouped: Record<SizingSettingsStatus, SizingSettingsItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterSizingSettings(
  items: ReadonlyArray<SizingSettingsItem>,
  query: string,
): SizingSettingsItem[] {
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

export function sortSizingSettings(
  items: ReadonlyArray<SizingSettingsItem>,
  key: SizingSettingsSortKey,
  direction: 'asc' | 'desc' = 'asc',
): SizingSettingsItem[] {
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

export function describeSizingSettingsItem(item: SizingSettingsItem): string {
  const amount = storageCode(item.amount);
  const name = storageCode(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatSizingSettingsAmount(amount: number): string {
  return storageCode(amount);
}

export function sizingSettingsStatusTone(
  status: SizingSettingsStatus,
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

export function pickSizingSettingsHighlights(
  items: ReadonlyArray<SizingSettingsItem>,
  limit = 3,
): SizingSettingsItem[] {
  return sortSizingSettings(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
