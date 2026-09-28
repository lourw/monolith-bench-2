import { validateDate } from '../../../utils/validate/validate-date';
import {
  emptyCheckoutDetailsTotals,
  type CheckoutDetailsItem,
  type CheckoutDetailsStatus,
  type CheckoutDetailsTotals,
} from './checkout-details.model';

export type CheckoutDetailsSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalCheckoutDetails(
  items: ReadonlyArray<CheckoutDetailsItem>,
): CheckoutDetailsTotals {
  const totals = emptyCheckoutDetailsTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupCheckoutDetailsByStatus(
  items: ReadonlyArray<CheckoutDetailsItem>,
): Record<CheckoutDetailsStatus, CheckoutDetailsItem[]> {
  const grouped: Record<CheckoutDetailsStatus, CheckoutDetailsItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterCheckoutDetails(
  items: ReadonlyArray<CheckoutDetailsItem>,
  query: string,
): CheckoutDetailsItem[] {
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

export function sortCheckoutDetails(
  items: ReadonlyArray<CheckoutDetailsItem>,
  key: CheckoutDetailsSortKey,
  direction: 'asc' | 'desc' = 'asc',
): CheckoutDetailsItem[] {
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

export function describeCheckoutDetailsItem(item: CheckoutDetailsItem): string {
  const amount = validateDate(item.amount);
  const name = validateDate(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatCheckoutDetailsAmount(amount: number): string {
  return validateDate(amount);
}

export function checkoutDetailsStatusTone(
  status: CheckoutDetailsStatus,
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

export function pickCheckoutDetailsHighlights(
  items: ReadonlyArray<CheckoutDetailsItem>,
  limit = 3,
): CheckoutDetailsItem[] {
  return sortCheckoutDetails(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
