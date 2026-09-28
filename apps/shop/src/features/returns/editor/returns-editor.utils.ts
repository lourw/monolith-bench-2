import { i18nCurrency } from '../../../utils/i18n/i18n-currency';
import {
  emptyReturnsEditorTotals,
  type ReturnsEditorItem,
  type ReturnsEditorStatus,
  type ReturnsEditorTotals,
} from './returns-editor.model';

export type ReturnsEditorSortKey = 'name' | 'amount' | 'quantity' | 'createdAt';

export function totalReturnsEditor(
  items: ReadonlyArray<ReturnsEditorItem>,
): ReturnsEditorTotals {
  const totals = emptyReturnsEditorTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupReturnsEditorByStatus(
  items: ReadonlyArray<ReturnsEditorItem>,
): Record<ReturnsEditorStatus, ReturnsEditorItem[]> {
  const grouped: Record<ReturnsEditorStatus, ReturnsEditorItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterReturnsEditor(
  items: ReadonlyArray<ReturnsEditorItem>,
  query: string,
): ReturnsEditorItem[] {
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

export function sortReturnsEditor(
  items: ReadonlyArray<ReturnsEditorItem>,
  key: ReturnsEditorSortKey,
  direction: 'asc' | 'desc' = 'asc',
): ReturnsEditorItem[] {
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

export function describeReturnsEditorItem(item: ReturnsEditorItem): string {
  const amount = i18nCurrency(item.amount);
  const name = i18nCurrency(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatReturnsEditorAmount(amount: number): string {
  return i18nCurrency(amount);
}

export function returnsEditorStatusTone(
  status: ReturnsEditorStatus,
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

export function pickReturnsEditorHighlights(
  items: ReadonlyArray<ReturnsEditorItem>,
  limit = 3,
): ReturnsEditorItem[] {
  return sortReturnsEditor(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
