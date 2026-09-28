import { storageCode } from '../../../utils/storage/storage-code';
import { i18nText } from '../../../utils/i18n/i18n-text';
import {
  emptyInventoryOverviewTotals,
  type InventoryOverviewItem,
  type InventoryOverviewStatus,
  type InventoryOverviewTotals,
} from './inventory-overview.model';

export type InventoryOverviewSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalInventoryOverview(
  items: ReadonlyArray<InventoryOverviewItem>,
): InventoryOverviewTotals {
  const totals = emptyInventoryOverviewTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupInventoryOverviewByStatus(
  items: ReadonlyArray<InventoryOverviewItem>,
): Record<InventoryOverviewStatus, InventoryOverviewItem[]> {
  const grouped: Record<InventoryOverviewStatus, InventoryOverviewItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterInventoryOverview(
  items: ReadonlyArray<InventoryOverviewItem>,
  query: string,
): InventoryOverviewItem[] {
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

export function sortInventoryOverview(
  items: ReadonlyArray<InventoryOverviewItem>,
  key: InventoryOverviewSortKey,
  direction: 'asc' | 'desc' = 'asc',
): InventoryOverviewItem[] {
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

export function describeInventoryOverviewItem(
  item: InventoryOverviewItem,
): string {
  const amount = storageCode(item.amount);
  const name = i18nText(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatInventoryOverviewAmount(amount: number): string {
  return storageCode(amount);
}

export function inventoryOverviewStatusTone(
  status: InventoryOverviewStatus,
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

export function pickInventoryOverviewHighlights(
  items: ReadonlyArray<InventoryOverviewItem>,
  limit = 3,
): InventoryOverviewItem[] {
  return sortInventoryOverview(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
