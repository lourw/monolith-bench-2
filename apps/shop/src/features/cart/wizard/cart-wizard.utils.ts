import { mathCurrency } from '../../../utils/math/math-currency';
import {
  emptyCartWizardTotals,
  type CartWizardItem,
  type CartWizardStatus,
  type CartWizardTotals,
} from './cart-wizard.model';

export type CartWizardSortKey = 'name' | 'amount' | 'quantity' | 'createdAt';

export function totalCartWizard(
  items: ReadonlyArray<CartWizardItem>,
): CartWizardTotals {
  const totals = emptyCartWizardTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupCartWizardByStatus(
  items: ReadonlyArray<CartWizardItem>,
): Record<CartWizardStatus, CartWizardItem[]> {
  const grouped: Record<CartWizardStatus, CartWizardItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterCartWizard(
  items: ReadonlyArray<CartWizardItem>,
  query: string,
): CartWizardItem[] {
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

export function sortCartWizard(
  items: ReadonlyArray<CartWizardItem>,
  key: CartWizardSortKey,
  direction: 'asc' | 'desc' = 'asc',
): CartWizardItem[] {
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

export function describeCartWizardItem(item: CartWizardItem): string {
  const amount = mathCurrency(item.amount);
  const name = mathCurrency(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatCartWizardAmount(amount: number): string {
  return mathCurrency(amount);
}

export function cartWizardStatusTone(
  status: CartWizardStatus,
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

export function pickCartWizardHighlights(
  items: ReadonlyArray<CartWizardItem>,
  limit = 3,
): CartWizardItem[] {
  return sortCartWizard(items, 'amount', 'desc').slice(0, Math.max(0, limit));
}
