import { asyncText } from '../../../utils/async/async-text';
import { formatText } from '../../../utils/format/format-text';
import {
  emptyPromotionsSettingsTotals,
  type PromotionsSettingsItem,
  type PromotionsSettingsStatus,
  type PromotionsSettingsTotals,
} from './promotions-settings.model';

export type PromotionsSettingsSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalPromotionsSettings(
  items: ReadonlyArray<PromotionsSettingsItem>,
): PromotionsSettingsTotals {
  const totals = emptyPromotionsSettingsTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupPromotionsSettingsByStatus(
  items: ReadonlyArray<PromotionsSettingsItem>,
): Record<PromotionsSettingsStatus, PromotionsSettingsItem[]> {
  const grouped: Record<PromotionsSettingsStatus, PromotionsSettingsItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterPromotionsSettings(
  items: ReadonlyArray<PromotionsSettingsItem>,
  query: string,
): PromotionsSettingsItem[] {
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

export function sortPromotionsSettings(
  items: ReadonlyArray<PromotionsSettingsItem>,
  key: PromotionsSettingsSortKey,
  direction: 'asc' | 'desc' = 'asc',
): PromotionsSettingsItem[] {
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

export function describePromotionsSettingsItem(
  item: PromotionsSettingsItem,
): string {
  const amount = asyncText(item.amount);
  const name = formatText(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatPromotionsSettingsAmount(amount: number): string {
  return asyncText(amount);
}

export function promotionsSettingsStatusTone(
  status: PromotionsSettingsStatus,
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

export function pickPromotionsSettingsHighlights(
  items: ReadonlyArray<PromotionsSettingsItem>,
  limit = 3,
): PromotionsSettingsItem[] {
  return sortPromotionsSettings(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
