import { asyncName } from '../../../utils/async/async-name';
import { validatePercent } from '../../../utils/validate/validate-percent';
import { validateName } from '../../../utils/validate/validate-name';
import {
  emptyCheckoutEditorTotals,
  type CheckoutEditorItem,
  type CheckoutEditorStatus,
  type CheckoutEditorTotals,
} from './checkout-editor.model';

export type CheckoutEditorSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalCheckoutEditor(
  items: ReadonlyArray<CheckoutEditorItem>,
): CheckoutEditorTotals {
  const totals = emptyCheckoutEditorTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupCheckoutEditorByStatus(
  items: ReadonlyArray<CheckoutEditorItem>,
): Record<CheckoutEditorStatus, CheckoutEditorItem[]> {
  const grouped: Record<CheckoutEditorStatus, CheckoutEditorItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterCheckoutEditor(
  items: ReadonlyArray<CheckoutEditorItem>,
  query: string,
): CheckoutEditorItem[] {
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

export function sortCheckoutEditor(
  items: ReadonlyArray<CheckoutEditorItem>,
  key: CheckoutEditorSortKey,
  direction: 'asc' | 'desc' = 'asc',
): CheckoutEditorItem[] {
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

export function describeCheckoutEditorItem(item: CheckoutEditorItem): string {
  const amount = asyncName(item.amount);
  const name = validateName(validatePercent(item.name));
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatCheckoutEditorAmount(amount: number): string {
  return asyncName(amount);
}

export function checkoutEditorStatusTone(
  status: CheckoutEditorStatus,
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

export function pickCheckoutEditorHighlights(
  items: ReadonlyArray<CheckoutEditorItem>,
  limit = 3,
): CheckoutEditorItem[] {
  return sortCheckoutEditor(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
