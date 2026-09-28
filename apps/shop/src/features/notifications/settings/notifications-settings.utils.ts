import { mathSlug } from '../../../utils/math/math-slug';
import {
  emptyNotificationsSettingsTotals,
  type NotificationsSettingsItem,
  type NotificationsSettingsStatus,
  type NotificationsSettingsTotals,
} from './notifications-settings.model';

export type NotificationsSettingsSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalNotificationsSettings(
  items: ReadonlyArray<NotificationsSettingsItem>,
): NotificationsSettingsTotals {
  const totals = emptyNotificationsSettingsTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupNotificationsSettingsByStatus(
  items: ReadonlyArray<NotificationsSettingsItem>,
): Record<NotificationsSettingsStatus, NotificationsSettingsItem[]> {
  const grouped: Record<
    NotificationsSettingsStatus,
    NotificationsSettingsItem[]
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

export function filterNotificationsSettings(
  items: ReadonlyArray<NotificationsSettingsItem>,
  query: string,
): NotificationsSettingsItem[] {
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

export function sortNotificationsSettings(
  items: ReadonlyArray<NotificationsSettingsItem>,
  key: NotificationsSettingsSortKey,
  direction: 'asc' | 'desc' = 'asc',
): NotificationsSettingsItem[] {
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

export function describeNotificationsSettingsItem(
  item: NotificationsSettingsItem,
): string {
  const amount = mathSlug(item.amount);
  const name = mathSlug(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatNotificationsSettingsAmount(amount: number): string {
  return mathSlug(amount);
}

export function notificationsSettingsStatusTone(
  status: NotificationsSettingsStatus,
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

export function pickNotificationsSettingsHighlights(
  items: ReadonlyArray<NotificationsSettingsItem>,
  limit = 3,
): NotificationsSettingsItem[] {
  return sortNotificationsSettings(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
