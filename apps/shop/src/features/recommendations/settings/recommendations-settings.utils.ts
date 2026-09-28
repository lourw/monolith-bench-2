import { storageAddress } from '../../../utils/storage/storage-address';
import { formatPercent } from '../../../utils/format/format-percent';
import {
  emptyRecommendationsSettingsTotals,
  type RecommendationsSettingsItem,
  type RecommendationsSettingsStatus,
  type RecommendationsSettingsTotals,
} from './recommendations-settings.model';

export type RecommendationsSettingsSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalRecommendationsSettings(
  items: ReadonlyArray<RecommendationsSettingsItem>,
): RecommendationsSettingsTotals {
  const totals = emptyRecommendationsSettingsTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupRecommendationsSettingsByStatus(
  items: ReadonlyArray<RecommendationsSettingsItem>,
): Record<RecommendationsSettingsStatus, RecommendationsSettingsItem[]> {
  const grouped: Record<
    RecommendationsSettingsStatus,
    RecommendationsSettingsItem[]
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

export function filterRecommendationsSettings(
  items: ReadonlyArray<RecommendationsSettingsItem>,
  query: string,
): RecommendationsSettingsItem[] {
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

export function sortRecommendationsSettings(
  items: ReadonlyArray<RecommendationsSettingsItem>,
  key: RecommendationsSettingsSortKey,
  direction: 'asc' | 'desc' = 'asc',
): RecommendationsSettingsItem[] {
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

export function describeRecommendationsSettingsItem(
  item: RecommendationsSettingsItem,
): string {
  const amount = storageAddress(item.amount);
  const name = formatPercent(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatRecommendationsSettingsAmount(amount: number): string {
  return storageAddress(amount);
}

export function recommendationsSettingsStatusTone(
  status: RecommendationsSettingsStatus,
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

export function pickRecommendationsSettingsHighlights(
  items: ReadonlyArray<RecommendationsSettingsItem>,
  limit = 3,
): RecommendationsSettingsItem[] {
  return sortRecommendationsSettings(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
