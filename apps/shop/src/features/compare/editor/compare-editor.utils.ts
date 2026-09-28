import { storageAddress } from '../../../utils/storage/storage-address';
import { storageName } from '../../../utils/storage/storage-name';
import {
  emptyCompareEditorTotals,
  type CompareEditorItem,
  type CompareEditorStatus,
  type CompareEditorTotals,
} from './compare-editor.model';

export type CompareEditorSortKey = 'name' | 'amount' | 'quantity' | 'createdAt';

export function totalCompareEditor(
  items: ReadonlyArray<CompareEditorItem>,
): CompareEditorTotals {
  const totals = emptyCompareEditorTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupCompareEditorByStatus(
  items: ReadonlyArray<CompareEditorItem>,
): Record<CompareEditorStatus, CompareEditorItem[]> {
  const grouped: Record<CompareEditorStatus, CompareEditorItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterCompareEditor(
  items: ReadonlyArray<CompareEditorItem>,
  query: string,
): CompareEditorItem[] {
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

export function sortCompareEditor(
  items: ReadonlyArray<CompareEditorItem>,
  key: CompareEditorSortKey,
  direction: 'asc' | 'desc' = 'asc',
): CompareEditorItem[] {
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

export function describeCompareEditorItem(item: CompareEditorItem): string {
  const amount = storageAddress(item.amount);
  const name = storageName(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatCompareEditorAmount(amount: number): string {
  return storageAddress(amount);
}

export function compareEditorStatusTone(
  status: CompareEditorStatus,
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

export function pickCompareEditorHighlights(
  items: ReadonlyArray<CompareEditorItem>,
  limit = 3,
): CompareEditorItem[] {
  return sortCompareEditor(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
