import { mathCurrency } from '../../../utils/math/math-currency';
import {
  emptyCheckoutOverviewTotals,
  type CheckoutOverviewItem,
  type CheckoutOverviewStatus,
  type CheckoutOverviewTotals,
} from './checkout-overview.model';

export type CheckoutOverviewSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalCheckoutOverview(
  items: ReadonlyArray<CheckoutOverviewItem>,
): CheckoutOverviewTotals {
  const totals = emptyCheckoutOverviewTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupCheckoutOverviewByStatus(
  items: ReadonlyArray<CheckoutOverviewItem>,
): Record<CheckoutOverviewStatus, CheckoutOverviewItem[]> {
  const grouped: Record<CheckoutOverviewStatus, CheckoutOverviewItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterCheckoutOverview(
  items: ReadonlyArray<CheckoutOverviewItem>,
  query: string,
): CheckoutOverviewItem[] {
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

export function sortCheckoutOverview(
  items: ReadonlyArray<CheckoutOverviewItem>,
  key: CheckoutOverviewSortKey,
  direction: 'asc' | 'desc' = 'asc',
): CheckoutOverviewItem[] {
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

export function describeCheckoutOverviewItem(
  item: CheckoutOverviewItem,
): string {
  const amount = mathCurrency(item.amount);
  const name = mathCurrency(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatCheckoutOverviewAmount(amount: number): string {
  return mathCurrency(amount);
}

export function checkoutOverviewStatusTone(
  status: CheckoutOverviewStatus,
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

export function pickCheckoutOverviewHighlights(
  items: ReadonlyArray<CheckoutOverviewItem>,
  limit = 3,
): CheckoutOverviewItem[] {
  return sortCheckoutOverview(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
