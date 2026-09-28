import { validateAddress } from '../../../utils/validate/validate-address';
import {
  emptyLoyaltySettingsTotals,
  type LoyaltySettingsItem,
  type LoyaltySettingsStatus,
  type LoyaltySettingsTotals,
} from './loyalty-settings.model';

export type LoyaltySettingsSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalLoyaltySettings(
  items: ReadonlyArray<LoyaltySettingsItem>,
): LoyaltySettingsTotals {
  const totals = emptyLoyaltySettingsTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupLoyaltySettingsByStatus(
  items: ReadonlyArray<LoyaltySettingsItem>,
): Record<LoyaltySettingsStatus, LoyaltySettingsItem[]> {
  const grouped: Record<LoyaltySettingsStatus, LoyaltySettingsItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterLoyaltySettings(
  items: ReadonlyArray<LoyaltySettingsItem>,
  query: string,
): LoyaltySettingsItem[] {
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

export function sortLoyaltySettings(
  items: ReadonlyArray<LoyaltySettingsItem>,
  key: LoyaltySettingsSortKey,
  direction: 'asc' | 'desc' = 'asc',
): LoyaltySettingsItem[] {
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

export function describeLoyaltySettingsItem(item: LoyaltySettingsItem): string {
  const amount = validateAddress(item.amount);
  const name = validateAddress(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatLoyaltySettingsAmount(amount: number): string {
  return validateAddress(amount);
}

export function loyaltySettingsStatusTone(
  status: LoyaltySettingsStatus,
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

export function pickLoyaltySettingsHighlights(
  items: ReadonlyArray<LoyaltySettingsItem>,
  limit = 3,
): LoyaltySettingsItem[] {
  return sortLoyaltySettings(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
