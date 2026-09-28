import { validatePercent } from '../../../utils/validate/validate-percent';
import {
  emptyInventoryDashboardTotals,
  type InventoryDashboardItem,
  type InventoryDashboardStatus,
  type InventoryDashboardTotals,
} from './inventory-dashboard.model';

export type InventoryDashboardSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalInventoryDashboard(
  items: ReadonlyArray<InventoryDashboardItem>,
): InventoryDashboardTotals {
  const totals = emptyInventoryDashboardTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupInventoryDashboardByStatus(
  items: ReadonlyArray<InventoryDashboardItem>,
): Record<InventoryDashboardStatus, InventoryDashboardItem[]> {
  const grouped: Record<InventoryDashboardStatus, InventoryDashboardItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterInventoryDashboard(
  items: ReadonlyArray<InventoryDashboardItem>,
  query: string,
): InventoryDashboardItem[] {
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

export function sortInventoryDashboard(
  items: ReadonlyArray<InventoryDashboardItem>,
  key: InventoryDashboardSortKey,
  direction: 'asc' | 'desc' = 'asc',
): InventoryDashboardItem[] {
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

export function describeInventoryDashboardItem(
  item: InventoryDashboardItem,
): string {
  const amount = validatePercent(item.amount);
  const name = validatePercent(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatInventoryDashboardAmount(amount: number): string {
  return validatePercent(amount);
}

export function inventoryDashboardStatusTone(
  status: InventoryDashboardStatus,
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

export function pickInventoryDashboardHighlights(
  items: ReadonlyArray<InventoryDashboardItem>,
  limit = 3,
): InventoryDashboardItem[] {
  return sortInventoryDashboard(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
