import { validateDate } from '../../../utils/validate/validate-date';
import {
  emptyInventoryDetailsTotals,
  type InventoryDetailsItem,
  type InventoryDetailsStatus,
  type InventoryDetailsTotals,
} from './inventory-details.model';

export type InventoryDetailsSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalInventoryDetails(
  items: ReadonlyArray<InventoryDetailsItem>,
): InventoryDetailsTotals {
  const totals = emptyInventoryDetailsTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupInventoryDetailsByStatus(
  items: ReadonlyArray<InventoryDetailsItem>,
): Record<InventoryDetailsStatus, InventoryDetailsItem[]> {
  const grouped: Record<InventoryDetailsStatus, InventoryDetailsItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterInventoryDetails(
  items: ReadonlyArray<InventoryDetailsItem>,
  query: string,
): InventoryDetailsItem[] {
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

export function sortInventoryDetails(
  items: ReadonlyArray<InventoryDetailsItem>,
  key: InventoryDetailsSortKey,
  direction: 'asc' | 'desc' = 'asc',
): InventoryDetailsItem[] {
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

export function describeInventoryDetailsItem(
  item: InventoryDetailsItem,
): string {
  const amount = validateDate(item.amount);
  const name = validateDate(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatInventoryDetailsAmount(amount: number): string {
  return validateDate(amount);
}

export function inventoryDetailsStatusTone(
  status: InventoryDetailsStatus,
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

export function pickInventoryDetailsHighlights(
  items: ReadonlyArray<InventoryDetailsItem>,
  limit = 3,
): InventoryDetailsItem[] {
  return sortInventoryDetails(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
