import { i18nName } from '../../../utils/i18n/i18n-name';
import { i18nPercent } from '../../../utils/i18n/i18n-percent';
import {
  emptySubscriptionsSettingsTotals,
  type SubscriptionsSettingsItem,
  type SubscriptionsSettingsStatus,
  type SubscriptionsSettingsTotals,
} from './subscriptions-settings.model';

export type SubscriptionsSettingsSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalSubscriptionsSettings(
  items: ReadonlyArray<SubscriptionsSettingsItem>,
): SubscriptionsSettingsTotals {
  const totals = emptySubscriptionsSettingsTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupSubscriptionsSettingsByStatus(
  items: ReadonlyArray<SubscriptionsSettingsItem>,
): Record<SubscriptionsSettingsStatus, SubscriptionsSettingsItem[]> {
  const grouped: Record<
    SubscriptionsSettingsStatus,
    SubscriptionsSettingsItem[]
  > = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterSubscriptionsSettings(
  items: ReadonlyArray<SubscriptionsSettingsItem>,
  query: string,
): SubscriptionsSettingsItem[] {
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

export function sortSubscriptionsSettings(
  items: ReadonlyArray<SubscriptionsSettingsItem>,
  key: SubscriptionsSettingsSortKey,
  direction: 'asc' | 'desc' = 'asc',
): SubscriptionsSettingsItem[] {
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

export function describeSubscriptionsSettingsItem(
  item: SubscriptionsSettingsItem,
): string {
  const amount = i18nName(item.amount);
  const name = i18nPercent(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatSubscriptionsSettingsAmount(amount: number): string {
  return i18nName(amount);
}

export function subscriptionsSettingsStatusTone(
  status: SubscriptionsSettingsStatus,
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

export function pickSubscriptionsSettingsHighlights(
  items: ReadonlyArray<SubscriptionsSettingsItem>,
  limit = 3,
): SubscriptionsSettingsItem[] {
  return sortSubscriptionsSettings(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
