import { i18nNumber } from '../../../utils/i18n/i18n-number';
import { i18nText } from '../../../utils/i18n/i18n-text';
import { i18nSlug } from '../../../utils/i18n/i18n-slug';
import {
  emptyAnalyticsSettingsTotals,
  type AnalyticsSettingsItem,
  type AnalyticsSettingsStatus,
  type AnalyticsSettingsTotals,
} from './analytics-settings.model';

export type AnalyticsSettingsSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalAnalyticsSettings(
  items: ReadonlyArray<AnalyticsSettingsItem>,
): AnalyticsSettingsTotals {
  const totals = emptyAnalyticsSettingsTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupAnalyticsSettingsByStatus(
  items: ReadonlyArray<AnalyticsSettingsItem>,
): Record<AnalyticsSettingsStatus, AnalyticsSettingsItem[]> {
  const grouped: Record<AnalyticsSettingsStatus, AnalyticsSettingsItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterAnalyticsSettings(
  items: ReadonlyArray<AnalyticsSettingsItem>,
  query: string,
): AnalyticsSettingsItem[] {
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

export function sortAnalyticsSettings(
  items: ReadonlyArray<AnalyticsSettingsItem>,
  key: AnalyticsSettingsSortKey,
  direction: 'asc' | 'desc' = 'asc',
): AnalyticsSettingsItem[] {
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

export function describeAnalyticsSettingsItem(
  item: AnalyticsSettingsItem,
): string {
  const amount = i18nNumber(item.amount);
  const name = i18nSlug(i18nText(item.name));
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatAnalyticsSettingsAmount(amount: number): string {
  return i18nNumber(amount);
}

export function analyticsSettingsStatusTone(
  status: AnalyticsSettingsStatus,
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

export function pickAnalyticsSettingsHighlights(
  items: ReadonlyArray<AnalyticsSettingsItem>,
  limit = 3,
): AnalyticsSettingsItem[] {
  return sortAnalyticsSettings(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
