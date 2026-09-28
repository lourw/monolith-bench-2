import { asyncSlug } from '../../../utils/async/async-slug';
import { formatPhone } from '../../../utils/format/format-phone';
import {
  emptySubscriptionsEditorTotals,
  type SubscriptionsEditorItem,
  type SubscriptionsEditorStatus,
  type SubscriptionsEditorTotals,
} from './subscriptions-editor.model';

export type SubscriptionsEditorSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalSubscriptionsEditor(
  items: ReadonlyArray<SubscriptionsEditorItem>,
): SubscriptionsEditorTotals {
  const totals = emptySubscriptionsEditorTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupSubscriptionsEditorByStatus(
  items: ReadonlyArray<SubscriptionsEditorItem>,
): Record<SubscriptionsEditorStatus, SubscriptionsEditorItem[]> {
  const grouped: Record<SubscriptionsEditorStatus, SubscriptionsEditorItem[]> =
    {
      active: [],
      pending: [],
      archived: [],
    };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterSubscriptionsEditor(
  items: ReadonlyArray<SubscriptionsEditorItem>,
  query: string,
): SubscriptionsEditorItem[] {
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

export function sortSubscriptionsEditor(
  items: ReadonlyArray<SubscriptionsEditorItem>,
  key: SubscriptionsEditorSortKey,
  direction: 'asc' | 'desc' = 'asc',
): SubscriptionsEditorItem[] {
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

export function describeSubscriptionsEditorItem(
  item: SubscriptionsEditorItem,
): string {
  const amount = asyncSlug(item.amount);
  const name = formatPhone(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatSubscriptionsEditorAmount(amount: number): string {
  return asyncSlug(amount);
}

export function subscriptionsEditorStatusTone(
  status: SubscriptionsEditorStatus,
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

export function pickSubscriptionsEditorHighlights(
  items: ReadonlyArray<SubscriptionsEditorItem>,
  limit = 3,
): SubscriptionsEditorItem[] {
  return sortSubscriptionsEditor(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
