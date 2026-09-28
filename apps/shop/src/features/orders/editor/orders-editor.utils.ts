import { asyncSlug } from '../../../utils/async/async-slug';
import { formatAddress } from '../../../utils/format/format-address';
import {
  emptyOrdersEditorTotals,
  type OrdersEditorItem,
  type OrdersEditorStatus,
  type OrdersEditorTotals,
} from './orders-editor.model';

export type OrdersEditorSortKey = 'name' | 'amount' | 'quantity' | 'createdAt';

export function totalOrdersEditor(
  items: ReadonlyArray<OrdersEditorItem>,
): OrdersEditorTotals {
  const totals = emptyOrdersEditorTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupOrdersEditorByStatus(
  items: ReadonlyArray<OrdersEditorItem>,
): Record<OrdersEditorStatus, OrdersEditorItem[]> {
  const grouped: Record<OrdersEditorStatus, OrdersEditorItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterOrdersEditor(
  items: ReadonlyArray<OrdersEditorItem>,
  query: string,
): OrdersEditorItem[] {
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

export function sortOrdersEditor(
  items: ReadonlyArray<OrdersEditorItem>,
  key: OrdersEditorSortKey,
  direction: 'asc' | 'desc' = 'asc',
): OrdersEditorItem[] {
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

export function describeOrdersEditorItem(item: OrdersEditorItem): string {
  const amount = asyncSlug(item.amount);
  const name = formatAddress(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatOrdersEditorAmount(amount: number): string {
  return asyncSlug(amount);
}

export function ordersEditorStatusTone(
  status: OrdersEditorStatus,
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

export function pickOrdersEditorHighlights(
  items: ReadonlyArray<OrdersEditorItem>,
  limit = 3,
): OrdersEditorItem[] {
  return sortOrdersEditor(items, 'amount', 'desc').slice(0, Math.max(0, limit));
}
