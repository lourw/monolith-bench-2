import { collectionNumber } from '../../../utils/collection/collection-number';
import { validateText } from '../../../utils/validate/validate-text';
import {
  emptyCartDetailsTotals,
  type CartDetailsItem,
  type CartDetailsStatus,
  type CartDetailsTotals,
} from './cart-details.model';

export type CartDetailsSortKey = 'name' | 'amount' | 'quantity' | 'createdAt';

export function totalCartDetails(
  items: ReadonlyArray<CartDetailsItem>,
): CartDetailsTotals {
  const totals = emptyCartDetailsTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupCartDetailsByStatus(
  items: ReadonlyArray<CartDetailsItem>,
): Record<CartDetailsStatus, CartDetailsItem[]> {
  const grouped: Record<CartDetailsStatus, CartDetailsItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterCartDetails(
  items: ReadonlyArray<CartDetailsItem>,
  query: string,
): CartDetailsItem[] {
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

export function sortCartDetails(
  items: ReadonlyArray<CartDetailsItem>,
  key: CartDetailsSortKey,
  direction: 'asc' | 'desc' = 'asc',
): CartDetailsItem[] {
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

export function describeCartDetailsItem(item: CartDetailsItem): string {
  const amount = collectionNumber(item.amount);
  const name = validateText(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatCartDetailsAmount(amount: number): string {
  return collectionNumber(amount);
}

export function cartDetailsStatusTone(
  status: CartDetailsStatus,
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

export function pickCartDetailsHighlights(
  items: ReadonlyArray<CartDetailsItem>,
  limit = 3,
): CartDetailsItem[] {
  return sortCartDetails(items, 'amount', 'desc').slice(0, Math.max(0, limit));
}
