import { collectionPercent } from '../../../utils/collection/collection-percent';
import {
  emptyShippingDashboardTotals,
  type ShippingDashboardItem,
  type ShippingDashboardStatus,
  type ShippingDashboardTotals,
} from './shipping-dashboard.model';

export type ShippingDashboardSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalShippingDashboard(
  items: ReadonlyArray<ShippingDashboardItem>,
): ShippingDashboardTotals {
  const totals = emptyShippingDashboardTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupShippingDashboardByStatus(
  items: ReadonlyArray<ShippingDashboardItem>,
): Record<ShippingDashboardStatus, ShippingDashboardItem[]> {
  const grouped: Record<ShippingDashboardStatus, ShippingDashboardItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterShippingDashboard(
  items: ReadonlyArray<ShippingDashboardItem>,
  query: string,
): ShippingDashboardItem[] {
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

export function sortShippingDashboard(
  items: ReadonlyArray<ShippingDashboardItem>,
  key: ShippingDashboardSortKey,
  direction: 'asc' | 'desc' = 'asc',
): ShippingDashboardItem[] {
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

export function describeShippingDashboardItem(
  item: ShippingDashboardItem,
): string {
  const amount = collectionPercent(item.amount);
  const name = collectionPercent(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatShippingDashboardAmount(amount: number): string {
  return collectionPercent(amount);
}

export function shippingDashboardStatusTone(
  status: ShippingDashboardStatus,
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

export function pickShippingDashboardHighlights(
  items: ReadonlyArray<ShippingDashboardItem>,
  limit = 3,
): ShippingDashboardItem[] {
  return sortShippingDashboard(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
