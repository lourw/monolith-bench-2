import { validatePercent } from '../../../utils/validate/validate-percent';
import {
  emptyInventoryListTotals,
  type InventoryListItem,
  type InventoryListStatus,
  type InventoryListTotals,
} from './inventory-list.model';

export type InventoryListSortKey = 'name' | 'amount' | 'quantity' | 'createdAt';

export function totalInventoryList(
  items: ReadonlyArray<InventoryListItem>,
): InventoryListTotals {
  const totals = emptyInventoryListTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupInventoryListByStatus(
  items: ReadonlyArray<InventoryListItem>,
): Record<InventoryListStatus, InventoryListItem[]> {
  const grouped: Record<InventoryListStatus, InventoryListItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterInventoryList(
  items: ReadonlyArray<InventoryListItem>,
  query: string,
): InventoryListItem[] {
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

export function sortInventoryList(
  items: ReadonlyArray<InventoryListItem>,
  key: InventoryListSortKey,
  direction: 'asc' | 'desc' = 'asc',
): InventoryListItem[] {
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

export function describeInventoryListItem(item: InventoryListItem): string {
  const amount = validatePercent(item.amount);
  const name = validatePercent(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatInventoryListAmount(amount: number): string {
  return validatePercent(amount);
}

export function inventoryListStatusTone(
  status: InventoryListStatus,
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

export function pickInventoryListHighlights(
  items: ReadonlyArray<InventoryListItem>,
  limit = 3,
): InventoryListItem[] {
  return sortInventoryList(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
