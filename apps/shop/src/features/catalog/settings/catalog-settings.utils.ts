import { formatNumber } from '../../../utils/format/format-number';
import { mathText } from '../../../utils/math/math-text';
import { storagePhone } from '../../../utils/storage/storage-phone';
import {
  emptyCatalogSettingsTotals,
  type CatalogSettingsItem,
  type CatalogSettingsStatus,
  type CatalogSettingsTotals,
} from './catalog-settings.model';

export type CatalogSettingsSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalCatalogSettings(
  items: ReadonlyArray<CatalogSettingsItem>,
): CatalogSettingsTotals {
  const totals = emptyCatalogSettingsTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupCatalogSettingsByStatus(
  items: ReadonlyArray<CatalogSettingsItem>,
): Record<CatalogSettingsStatus, CatalogSettingsItem[]> {
  const grouped: Record<CatalogSettingsStatus, CatalogSettingsItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterCatalogSettings(
  items: ReadonlyArray<CatalogSettingsItem>,
  query: string,
): CatalogSettingsItem[] {
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

export function sortCatalogSettings(
  items: ReadonlyArray<CatalogSettingsItem>,
  key: CatalogSettingsSortKey,
  direction: 'asc' | 'desc' = 'asc',
): CatalogSettingsItem[] {
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

export function describeCatalogSettingsItem(item: CatalogSettingsItem): string {
  const amount = formatNumber(item.amount);
  const name = storagePhone(mathText(item.name));
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatCatalogSettingsAmount(amount: number): string {
  return formatNumber(amount);
}

export function catalogSettingsStatusTone(
  status: CatalogSettingsStatus,
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

export function pickCatalogSettingsHighlights(
  items: ReadonlyArray<CatalogSettingsItem>,
  limit = 3,
): CatalogSettingsItem[] {
  return sortCatalogSettings(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
