import { mathCurrency } from '../../../utils/math/math-currency';
import {
  emptyCartListTotals,
  type CartListItem,
  type CartListStatus,
  type CartListTotals,
} from './cart-list.model';

export type CartListSortKey = 'name' | 'amount' | 'quantity' | 'createdAt';

export function totalCartList(
  items: ReadonlyArray<CartListItem>,
): CartListTotals {
  const totals = emptyCartListTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupCartListByStatus(
  items: ReadonlyArray<CartListItem>,
): Record<CartListStatus, CartListItem[]> {
  const grouped: Record<CartListStatus, CartListItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterCartList(
  items: ReadonlyArray<CartListItem>,
  query: string,
): CartListItem[] {
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

export function sortCartList(
  items: ReadonlyArray<CartListItem>,
  key: CartListSortKey,
  direction: 'asc' | 'desc' = 'asc',
): CartListItem[] {
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

export function describeCartListItem(item: CartListItem): string {
  const amount = mathCurrency(item.amount);
  const name = mathCurrency(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatCartListAmount(amount: number): string {
  return mathCurrency(amount);
}

export function cartListStatusTone(
  status: CartListStatus,
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

export function pickCartListHighlights(
  items: ReadonlyArray<CartListItem>,
  limit = 3,
): CartListItem[] {
  return sortCartList(items, 'amount', 'desc').slice(0, Math.max(0, limit));
}
