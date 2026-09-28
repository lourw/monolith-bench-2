import { formatCurrency } from '../../../utils/format/format-currency';
import {
  emptyTrackingSettingsTotals,
  type TrackingSettingsItem,
  type TrackingSettingsStatus,
  type TrackingSettingsTotals,
} from './tracking-settings.model';

export type TrackingSettingsSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalTrackingSettings(
  items: ReadonlyArray<TrackingSettingsItem>,
): TrackingSettingsTotals {
  const totals = emptyTrackingSettingsTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupTrackingSettingsByStatus(
  items: ReadonlyArray<TrackingSettingsItem>,
): Record<TrackingSettingsStatus, TrackingSettingsItem[]> {
  const grouped: Record<TrackingSettingsStatus, TrackingSettingsItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterTrackingSettings(
  items: ReadonlyArray<TrackingSettingsItem>,
  query: string,
): TrackingSettingsItem[] {
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

export function sortTrackingSettings(
  items: ReadonlyArray<TrackingSettingsItem>,
  key: TrackingSettingsSortKey,
  direction: 'asc' | 'desc' = 'asc',
): TrackingSettingsItem[] {
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

export function describeTrackingSettingsItem(
  item: TrackingSettingsItem,
): string {
  const amount = formatCurrency(item.amount);
  const name = formatCurrency(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatTrackingSettingsAmount(amount: number): string {
  return formatCurrency(amount);
}

export function trackingSettingsStatusTone(
  status: TrackingSettingsStatus,
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

export function pickTrackingSettingsHighlights(
  items: ReadonlyArray<TrackingSettingsItem>,
  limit = 3,
): TrackingSettingsItem[] {
  return sortTrackingSettings(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
