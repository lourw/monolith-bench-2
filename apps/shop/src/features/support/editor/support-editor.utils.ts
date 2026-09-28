import { storagePercent } from '../../../utils/storage/storage-percent';
import { validateNumber } from '../../../utils/validate/validate-number';
import {
  emptySupportEditorTotals,
  type SupportEditorItem,
  type SupportEditorStatus,
  type SupportEditorTotals,
} from './support-editor.model';

export type SupportEditorSortKey = 'name' | 'amount' | 'quantity' | 'createdAt';

export function totalSupportEditor(
  items: ReadonlyArray<SupportEditorItem>,
): SupportEditorTotals {
  const totals = emptySupportEditorTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupSupportEditorByStatus(
  items: ReadonlyArray<SupportEditorItem>,
): Record<SupportEditorStatus, SupportEditorItem[]> {
  const grouped: Record<SupportEditorStatus, SupportEditorItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterSupportEditor(
  items: ReadonlyArray<SupportEditorItem>,
  query: string,
): SupportEditorItem[] {
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

export function sortSupportEditor(
  items: ReadonlyArray<SupportEditorItem>,
  key: SupportEditorSortKey,
  direction: 'asc' | 'desc' = 'asc',
): SupportEditorItem[] {
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

export function describeSupportEditorItem(item: SupportEditorItem): string {
  const amount = storagePercent(item.amount);
  const name = validateNumber(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatSupportEditorAmount(amount: number): string {
  return storagePercent(amount);
}

export function supportEditorStatusTone(
  status: SupportEditorStatus,
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

export function pickSupportEditorHighlights(
  items: ReadonlyArray<SupportEditorItem>,
  limit = 3,
): SupportEditorItem[] {
  return sortSupportEditor(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
