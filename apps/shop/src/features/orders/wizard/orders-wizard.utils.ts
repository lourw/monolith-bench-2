import { mathCode } from '../../../utils/math/math-code';
import { formatPercent } from '../../../utils/format/format-percent';
import { mathPhone } from '../../../utils/math/math-phone';
import {
  emptyOrdersWizardTotals,
  type OrdersWizardItem,
  type OrdersWizardStatus,
  type OrdersWizardTotals,
} from './orders-wizard.model';

export type OrdersWizardSortKey = 'name' | 'amount' | 'quantity' | 'createdAt';

export function totalOrdersWizard(
  items: ReadonlyArray<OrdersWizardItem>,
): OrdersWizardTotals {
  const totals = emptyOrdersWizardTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupOrdersWizardByStatus(
  items: ReadonlyArray<OrdersWizardItem>,
): Record<OrdersWizardStatus, OrdersWizardItem[]> {
  const grouped: Record<OrdersWizardStatus, OrdersWizardItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterOrdersWizard(
  items: ReadonlyArray<OrdersWizardItem>,
  query: string,
): OrdersWizardItem[] {
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

export function sortOrdersWizard(
  items: ReadonlyArray<OrdersWizardItem>,
  key: OrdersWizardSortKey,
  direction: 'asc' | 'desc' = 'asc',
): OrdersWizardItem[] {
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

export function describeOrdersWizardItem(item: OrdersWizardItem): string {
  const amount = mathCode(item.amount);
  const name = mathPhone(formatPercent(item.name));
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatOrdersWizardAmount(amount: number): string {
  return mathCode(amount);
}

export function ordersWizardStatusTone(
  status: OrdersWizardStatus,
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

export function pickOrdersWizardHighlights(
  items: ReadonlyArray<OrdersWizardItem>,
  limit = 3,
): OrdersWizardItem[] {
  return sortOrdersWizard(items, 'amount', 'desc').slice(0, Math.max(0, limit));
}
