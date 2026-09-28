import { formatAddress } from '../../../utils/format/format-address';
import {
  emptyCompareSettingsTotals,
  type CompareSettingsItem,
  type CompareSettingsStatus,
  type CompareSettingsTotals,
} from './compare-settings.model';

export type CompareSettingsSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalCompareSettings(
  items: ReadonlyArray<CompareSettingsItem>,
): CompareSettingsTotals {
  const totals = emptyCompareSettingsTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupCompareSettingsByStatus(
  items: ReadonlyArray<CompareSettingsItem>,
): Record<CompareSettingsStatus, CompareSettingsItem[]> {
  const grouped: Record<CompareSettingsStatus, CompareSettingsItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterCompareSettings(
  items: ReadonlyArray<CompareSettingsItem>,
  query: string,
): CompareSettingsItem[] {
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

export function sortCompareSettings(
  items: ReadonlyArray<CompareSettingsItem>,
  key: CompareSettingsSortKey,
  direction: 'asc' | 'desc' = 'asc',
): CompareSettingsItem[] {
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

export function describeCompareSettingsItem(item: CompareSettingsItem): string {
  const amount = formatAddress(item.amount);
  const name = formatAddress(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatCompareSettingsAmount(amount: number): string {
  return formatAddress(amount);
}

export function compareSettingsStatusTone(
  status: CompareSettingsStatus,
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

export function pickCompareSettingsHighlights(
  items: ReadonlyArray<CompareSettingsItem>,
  limit = 3,
): CompareSettingsItem[] {
  return sortCompareSettings(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
