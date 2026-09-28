import { validateAddress } from '../../../utils/validate/validate-address';
import { validatePhone } from '../../../utils/validate/validate-phone';
import { i18nAddress } from '../../../utils/i18n/i18n-address';
import {
  emptyBundlesSettingsTotals,
  type BundlesSettingsItem,
  type BundlesSettingsStatus,
  type BundlesSettingsTotals,
} from './bundles-settings.model';

export type BundlesSettingsSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalBundlesSettings(
  items: ReadonlyArray<BundlesSettingsItem>,
): BundlesSettingsTotals {
  const totals = emptyBundlesSettingsTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupBundlesSettingsByStatus(
  items: ReadonlyArray<BundlesSettingsItem>,
): Record<BundlesSettingsStatus, BundlesSettingsItem[]> {
  const grouped: Record<BundlesSettingsStatus, BundlesSettingsItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterBundlesSettings(
  items: ReadonlyArray<BundlesSettingsItem>,
  query: string,
): BundlesSettingsItem[] {
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

export function sortBundlesSettings(
  items: ReadonlyArray<BundlesSettingsItem>,
  key: BundlesSettingsSortKey,
  direction: 'asc' | 'desc' = 'asc',
): BundlesSettingsItem[] {
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

export function describeBundlesSettingsItem(item: BundlesSettingsItem): string {
  const amount = validateAddress(item.amount);
  const name = i18nAddress(validatePhone(item.name));
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatBundlesSettingsAmount(amount: number): string {
  return validateAddress(amount);
}

export function bundlesSettingsStatusTone(
  status: BundlesSettingsStatus,
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

export function pickBundlesSettingsHighlights(
  items: ReadonlyArray<BundlesSettingsItem>,
  limit = 3,
): BundlesSettingsItem[] {
  return sortBundlesSettings(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
