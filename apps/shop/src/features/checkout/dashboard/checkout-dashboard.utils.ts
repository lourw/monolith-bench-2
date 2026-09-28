import { i18nAddress } from '../../../utils/i18n/i18n-address';
import { asyncCode } from '../../../utils/async/async-code';
import { collectionPhone } from '../../../utils/collection/collection-phone';
import {
  emptyCheckoutDashboardTotals,
  type CheckoutDashboardItem,
  type CheckoutDashboardStatus,
  type CheckoutDashboardTotals,
} from './checkout-dashboard.model';

export type CheckoutDashboardSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalCheckoutDashboard(
  items: ReadonlyArray<CheckoutDashboardItem>,
): CheckoutDashboardTotals {
  const totals = emptyCheckoutDashboardTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupCheckoutDashboardByStatus(
  items: ReadonlyArray<CheckoutDashboardItem>,
): Record<CheckoutDashboardStatus, CheckoutDashboardItem[]> {
  const grouped: Record<CheckoutDashboardStatus, CheckoutDashboardItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterCheckoutDashboard(
  items: ReadonlyArray<CheckoutDashboardItem>,
  query: string,
): CheckoutDashboardItem[] {
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

export function sortCheckoutDashboard(
  items: ReadonlyArray<CheckoutDashboardItem>,
  key: CheckoutDashboardSortKey,
  direction: 'asc' | 'desc' = 'asc',
): CheckoutDashboardItem[] {
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

export function describeCheckoutDashboardItem(
  item: CheckoutDashboardItem,
): string {
  const amount = i18nAddress(item.amount);
  const name = collectionPhone(asyncCode(item.name));
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatCheckoutDashboardAmount(amount: number): string {
  return i18nAddress(amount);
}

export function checkoutDashboardStatusTone(
  status: CheckoutDashboardStatus,
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

export function pickCheckoutDashboardHighlights(
  items: ReadonlyArray<CheckoutDashboardItem>,
  limit = 3,
): CheckoutDashboardItem[] {
  return sortCheckoutDashboard(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
