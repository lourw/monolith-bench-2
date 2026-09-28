import { validatePhone } from '../../../utils/validate/validate-phone';
import {
  emptySearchEditorTotals,
  type SearchEditorItem,
  type SearchEditorStatus,
  type SearchEditorTotals,
} from './search-editor.model';

export type SearchEditorSortKey = 'name' | 'amount' | 'quantity' | 'createdAt';

export function totalSearchEditor(
  items: ReadonlyArray<SearchEditorItem>,
): SearchEditorTotals {
  const totals = emptySearchEditorTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupSearchEditorByStatus(
  items: ReadonlyArray<SearchEditorItem>,
): Record<SearchEditorStatus, SearchEditorItem[]> {
  const grouped: Record<SearchEditorStatus, SearchEditorItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterSearchEditor(
  items: ReadonlyArray<SearchEditorItem>,
  query: string,
): SearchEditorItem[] {
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

export function sortSearchEditor(
  items: ReadonlyArray<SearchEditorItem>,
  key: SearchEditorSortKey,
  direction: 'asc' | 'desc' = 'asc',
): SearchEditorItem[] {
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

export function describeSearchEditorItem(item: SearchEditorItem): string {
  const amount = validatePhone(item.amount);
  const name = validatePhone(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatSearchEditorAmount(amount: number): string {
  return validatePhone(amount);
}

export function searchEditorStatusTone(
  status: SearchEditorStatus,
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

export function pickSearchEditorHighlights(
  items: ReadonlyArray<SearchEditorItem>,
  limit = 3,
): SearchEditorItem[] {
  return sortSearchEditor(items, 'amount', 'desc').slice(0, Math.max(0, limit));
}
