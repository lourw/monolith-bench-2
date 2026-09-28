import { formatPhone } from '../../../utils/format/format-phone';
import { asyncName } from '../../../utils/async/async-name';
import { i18nPercent } from '../../../utils/i18n/i18n-percent';
import {
  emptyCartEditorTotals,
  type CartEditorItem,
  type CartEditorStatus,
  type CartEditorTotals,
} from './cart-editor.model';

export type CartEditorSortKey = 'name' | 'amount' | 'quantity' | 'createdAt';

export function totalCartEditor(
  items: ReadonlyArray<CartEditorItem>,
): CartEditorTotals {
  const totals = emptyCartEditorTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupCartEditorByStatus(
  items: ReadonlyArray<CartEditorItem>,
): Record<CartEditorStatus, CartEditorItem[]> {
  const grouped: Record<CartEditorStatus, CartEditorItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterCartEditor(
  items: ReadonlyArray<CartEditorItem>,
  query: string,
): CartEditorItem[] {
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

export function sortCartEditor(
  items: ReadonlyArray<CartEditorItem>,
  key: CartEditorSortKey,
  direction: 'asc' | 'desc' = 'asc',
): CartEditorItem[] {
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

export function describeCartEditorItem(item: CartEditorItem): string {
  const amount = formatPhone(item.amount);
  const name = i18nPercent(asyncName(item.name));
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatCartEditorAmount(amount: number): string {
  return formatPhone(amount);
}

export function cartEditorStatusTone(
  status: CartEditorStatus,
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

export function pickCartEditorHighlights(
  items: ReadonlyArray<CartEditorItem>,
  limit = 3,
): CartEditorItem[] {
  return sortCartEditor(items, 'amount', 'desc').slice(0, Math.max(0, limit));
}
