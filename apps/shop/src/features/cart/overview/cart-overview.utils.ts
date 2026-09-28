import { mathNumber } from '../../../utils/math/math-number';
import { validatePercent } from '../../../utils/validate/validate-percent';
import { validateName } from '../../../utils/validate/validate-name';
import {
  emptyCartOverviewTotals,
  type CartOverviewItem,
  type CartOverviewStatus,
  type CartOverviewTotals,
} from './cart-overview.model';

export type CartOverviewSortKey = 'name' | 'amount' | 'quantity' | 'createdAt';

export function totalCartOverview(
  items: ReadonlyArray<CartOverviewItem>,
): CartOverviewTotals {
  const totals = emptyCartOverviewTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupCartOverviewByStatus(
  items: ReadonlyArray<CartOverviewItem>,
): Record<CartOverviewStatus, CartOverviewItem[]> {
  const grouped: Record<CartOverviewStatus, CartOverviewItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterCartOverview(
  items: ReadonlyArray<CartOverviewItem>,
  query: string,
): CartOverviewItem[] {
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

export function sortCartOverview(
  items: ReadonlyArray<CartOverviewItem>,
  key: CartOverviewSortKey,
  direction: 'asc' | 'desc' = 'asc',
): CartOverviewItem[] {
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

export function describeCartOverviewItem(item: CartOverviewItem): string {
  const amount = mathNumber(item.amount);
  const name = validateName(validatePercent(item.name));
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatCartOverviewAmount(amount: number): string {
  return mathNumber(amount);
}

export function cartOverviewStatusTone(
  status: CartOverviewStatus,
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

export function pickCartOverviewHighlights(
  items: ReadonlyArray<CartOverviewItem>,
  limit = 3,
): CartOverviewItem[] {
  return sortCartOverview(items, 'amount', 'desc').slice(0, Math.max(0, limit));
}
