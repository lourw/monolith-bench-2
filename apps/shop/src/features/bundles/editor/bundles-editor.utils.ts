import { storagePhone } from '../../../utils/storage/storage-phone';
import {
  emptyBundlesEditorTotals,
  type BundlesEditorItem,
  type BundlesEditorStatus,
  type BundlesEditorTotals,
} from './bundles-editor.model';

export type BundlesEditorSortKey = 'name' | 'amount' | 'quantity' | 'createdAt';

export function totalBundlesEditor(
  items: ReadonlyArray<BundlesEditorItem>,
): BundlesEditorTotals {
  const totals = emptyBundlesEditorTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupBundlesEditorByStatus(
  items: ReadonlyArray<BundlesEditorItem>,
): Record<BundlesEditorStatus, BundlesEditorItem[]> {
  const grouped: Record<BundlesEditorStatus, BundlesEditorItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterBundlesEditor(
  items: ReadonlyArray<BundlesEditorItem>,
  query: string,
): BundlesEditorItem[] {
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

export function sortBundlesEditor(
  items: ReadonlyArray<BundlesEditorItem>,
  key: BundlesEditorSortKey,
  direction: 'asc' | 'desc' = 'asc',
): BundlesEditorItem[] {
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

export function describeBundlesEditorItem(item: BundlesEditorItem): string {
  const amount = storagePhone(item.amount);
  const name = storagePhone(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatBundlesEditorAmount(amount: number): string {
  return storagePhone(amount);
}

export function bundlesEditorStatusTone(
  status: BundlesEditorStatus,
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

export function pickBundlesEditorHighlights(
  items: ReadonlyArray<BundlesEditorItem>,
  limit = 3,
): BundlesEditorItem[] {
  return sortBundlesEditor(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
