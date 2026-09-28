import { formatCode } from '../../../utils/format/format-code';
import { asyncName } from '../../../utils/async/async-name';
import { formatPercent } from '../../../utils/format/format-percent';
import {
  emptyShippingEditorTotals,
  type ShippingEditorItem,
  type ShippingEditorStatus,
  type ShippingEditorTotals,
} from './shipping-editor.model';

export type ShippingEditorSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalShippingEditor(
  items: ReadonlyArray<ShippingEditorItem>,
): ShippingEditorTotals {
  const totals = emptyShippingEditorTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupShippingEditorByStatus(
  items: ReadonlyArray<ShippingEditorItem>,
): Record<ShippingEditorStatus, ShippingEditorItem[]> {
  const grouped: Record<ShippingEditorStatus, ShippingEditorItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterShippingEditor(
  items: ReadonlyArray<ShippingEditorItem>,
  query: string,
): ShippingEditorItem[] {
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

export function sortShippingEditor(
  items: ReadonlyArray<ShippingEditorItem>,
  key: ShippingEditorSortKey,
  direction: 'asc' | 'desc' = 'asc',
): ShippingEditorItem[] {
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

export function describeShippingEditorItem(item: ShippingEditorItem): string {
  const amount = formatCode(item.amount);
  const name = formatPercent(asyncName(item.name));
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatShippingEditorAmount(amount: number): string {
  return formatCode(amount);
}

export function shippingEditorStatusTone(
  status: ShippingEditorStatus,
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

export function pickShippingEditorHighlights(
  items: ReadonlyArray<ShippingEditorItem>,
  limit = 3,
): ShippingEditorItem[] {
  return sortShippingEditor(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
