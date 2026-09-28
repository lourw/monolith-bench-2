import { mathText } from '../../../utils/math/math-text';
import {
  emptyCheckoutListTotals,
  type CheckoutListItem,
  type CheckoutListStatus,
  type CheckoutListTotals,
} from './checkout-list.model';

export type CheckoutListSortKey = 'name' | 'amount' | 'quantity' | 'createdAt';

export function totalCheckoutList(
  items: ReadonlyArray<CheckoutListItem>,
): CheckoutListTotals {
  const totals = emptyCheckoutListTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupCheckoutListByStatus(
  items: ReadonlyArray<CheckoutListItem>,
): Record<CheckoutListStatus, CheckoutListItem[]> {
  const grouped: Record<CheckoutListStatus, CheckoutListItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterCheckoutList(
  items: ReadonlyArray<CheckoutListItem>,
  query: string,
): CheckoutListItem[] {
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

export function sortCheckoutList(
  items: ReadonlyArray<CheckoutListItem>,
  key: CheckoutListSortKey,
  direction: 'asc' | 'desc' = 'asc',
): CheckoutListItem[] {
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

export function describeCheckoutListItem(item: CheckoutListItem): string {
  const amount = mathText(item.amount);
  const name = mathText(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatCheckoutListAmount(amount: number): string {
  return mathText(amount);
}

export function checkoutListStatusTone(
  status: CheckoutListStatus,
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

export function pickCheckoutListHighlights(
  items: ReadonlyArray<CheckoutListItem>,
  limit = 3,
): CheckoutListItem[] {
  return sortCheckoutList(items, 'amount', 'desc').slice(0, Math.max(0, limit));
}
