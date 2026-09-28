import { formatName } from '../../../utils/format/format-name';
import {
  emptyPreordersSettingsTotals,
  type PreordersSettingsItem,
  type PreordersSettingsStatus,
  type PreordersSettingsTotals,
} from './preorders-settings.model';

export type PreordersSettingsSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalPreordersSettings(
  items: ReadonlyArray<PreordersSettingsItem>,
): PreordersSettingsTotals {
  const totals = emptyPreordersSettingsTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupPreordersSettingsByStatus(
  items: ReadonlyArray<PreordersSettingsItem>,
): Record<PreordersSettingsStatus, PreordersSettingsItem[]> {
  const grouped: Record<PreordersSettingsStatus, PreordersSettingsItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterPreordersSettings(
  items: ReadonlyArray<PreordersSettingsItem>,
  query: string,
): PreordersSettingsItem[] {
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

export function sortPreordersSettings(
  items: ReadonlyArray<PreordersSettingsItem>,
  key: PreordersSettingsSortKey,
  direction: 'asc' | 'desc' = 'asc',
): PreordersSettingsItem[] {
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

export function describePreordersSettingsItem(
  item: PreordersSettingsItem,
): string {
  const amount = formatName(item.amount);
  const name = formatName(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatPreordersSettingsAmount(amount: number): string {
  return formatName(amount);
}

export function preordersSettingsStatusTone(
  status: PreordersSettingsStatus,
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

export function pickPreordersSettingsHighlights(
  items: ReadonlyArray<PreordersSettingsItem>,
  limit = 3,
): PreordersSettingsItem[] {
  return sortPreordersSettings(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
