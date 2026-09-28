import { asyncPhone } from '../../../utils/async/async-phone';
import { collectionPhone } from '../../../utils/collection/collection-phone';
import {
  emptySizingEditorTotals,
  type SizingEditorItem,
  type SizingEditorStatus,
  type SizingEditorTotals,
} from './sizing-editor.model';

export type SizingEditorSortKey = 'name' | 'amount' | 'quantity' | 'createdAt';

export function totalSizingEditor(
  items: ReadonlyArray<SizingEditorItem>,
): SizingEditorTotals {
  const totals = emptySizingEditorTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupSizingEditorByStatus(
  items: ReadonlyArray<SizingEditorItem>,
): Record<SizingEditorStatus, SizingEditorItem[]> {
  const grouped: Record<SizingEditorStatus, SizingEditorItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterSizingEditor(
  items: ReadonlyArray<SizingEditorItem>,
  query: string,
): SizingEditorItem[] {
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

export function sortSizingEditor(
  items: ReadonlyArray<SizingEditorItem>,
  key: SizingEditorSortKey,
  direction: 'asc' | 'desc' = 'asc',
): SizingEditorItem[] {
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

export function describeSizingEditorItem(item: SizingEditorItem): string {
  const amount = asyncPhone(item.amount);
  const name = collectionPhone(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatSizingEditorAmount(amount: number): string {
  return asyncPhone(amount);
}

export function sizingEditorStatusTone(
  status: SizingEditorStatus,
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

export function pickSizingEditorHighlights(
  items: ReadonlyArray<SizingEditorItem>,
  limit = 3,
): SizingEditorItem[] {
  return sortSizingEditor(items, 'amount', 'desc').slice(0, Math.max(0, limit));
}
