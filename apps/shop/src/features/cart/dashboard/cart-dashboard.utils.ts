import { storageDate } from '../../../utils/storage/storage-date';
import {
  emptyCartDashboardTotals,
  type CartDashboardItem,
  type CartDashboardStatus,
  type CartDashboardTotals,
} from './cart-dashboard.model';

export type CartDashboardSortKey = 'name' | 'amount' | 'quantity' | 'createdAt';

export function totalCartDashboard(
  items: ReadonlyArray<CartDashboardItem>,
): CartDashboardTotals {
  const totals = emptyCartDashboardTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupCartDashboardByStatus(
  items: ReadonlyArray<CartDashboardItem>,
): Record<CartDashboardStatus, CartDashboardItem[]> {
  const grouped: Record<CartDashboardStatus, CartDashboardItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterCartDashboard(
  items: ReadonlyArray<CartDashboardItem>,
  query: string,
): CartDashboardItem[] {
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

export function sortCartDashboard(
  items: ReadonlyArray<CartDashboardItem>,
  key: CartDashboardSortKey,
  direction: 'asc' | 'desc' = 'asc',
): CartDashboardItem[] {
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

export function describeCartDashboardItem(item: CartDashboardItem): string {
  const amount = storageDate(item.amount);
  const name = storageDate(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatCartDashboardAmount(amount: number): string {
  return storageDate(amount);
}

export function cartDashboardStatusTone(
  status: CartDashboardStatus,
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

export function pickCartDashboardHighlights(
  items: ReadonlyArray<CartDashboardItem>,
  limit = 3,
): CartDashboardItem[] {
  return sortCartDashboard(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
