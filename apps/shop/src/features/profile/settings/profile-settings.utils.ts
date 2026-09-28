import { storageAddress } from '../../../utils/storage/storage-address';
import {
  emptyProfileSettingsTotals,
  type ProfileSettingsItem,
  type ProfileSettingsStatus,
  type ProfileSettingsTotals,
} from './profile-settings.model';

export type ProfileSettingsSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalProfileSettings(
  items: ReadonlyArray<ProfileSettingsItem>,
): ProfileSettingsTotals {
  const totals = emptyProfileSettingsTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupProfileSettingsByStatus(
  items: ReadonlyArray<ProfileSettingsItem>,
): Record<ProfileSettingsStatus, ProfileSettingsItem[]> {
  const grouped: Record<ProfileSettingsStatus, ProfileSettingsItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterProfileSettings(
  items: ReadonlyArray<ProfileSettingsItem>,
  query: string,
): ProfileSettingsItem[] {
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

export function sortProfileSettings(
  items: ReadonlyArray<ProfileSettingsItem>,
  key: ProfileSettingsSortKey,
  direction: 'asc' | 'desc' = 'asc',
): ProfileSettingsItem[] {
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

export function describeProfileSettingsItem(item: ProfileSettingsItem): string {
  const amount = storageAddress(item.amount);
  const name = storageAddress(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatProfileSettingsAmount(amount: number): string {
  return storageAddress(amount);
}

export function profileSettingsStatusTone(
  status: ProfileSettingsStatus,
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

export function pickProfileSettingsHighlights(
  items: ReadonlyArray<ProfileSettingsItem>,
  limit = 3,
): ProfileSettingsItem[] {
  return sortProfileSettings(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
