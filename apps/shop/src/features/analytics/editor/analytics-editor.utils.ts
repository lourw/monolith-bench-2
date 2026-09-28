import { formatCode } from '../../../utils/format/format-code';
import { asyncCode } from '../../../utils/async/async-code';
import {
  emptyAnalyticsEditorTotals,
  type AnalyticsEditorItem,
  type AnalyticsEditorStatus,
  type AnalyticsEditorTotals,
} from './analytics-editor.model';

export type AnalyticsEditorSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalAnalyticsEditor(
  items: ReadonlyArray<AnalyticsEditorItem>,
): AnalyticsEditorTotals {
  const totals = emptyAnalyticsEditorTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupAnalyticsEditorByStatus(
  items: ReadonlyArray<AnalyticsEditorItem>,
): Record<AnalyticsEditorStatus, AnalyticsEditorItem[]> {
  const grouped: Record<AnalyticsEditorStatus, AnalyticsEditorItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterAnalyticsEditor(
  items: ReadonlyArray<AnalyticsEditorItem>,
  query: string,
): AnalyticsEditorItem[] {
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

export function sortAnalyticsEditor(
  items: ReadonlyArray<AnalyticsEditorItem>,
  key: AnalyticsEditorSortKey,
  direction: 'asc' | 'desc' = 'asc',
): AnalyticsEditorItem[] {
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

export function describeAnalyticsEditorItem(item: AnalyticsEditorItem): string {
  const amount = formatCode(item.amount);
  const name = asyncCode(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatAnalyticsEditorAmount(amount: number): string {
  return formatCode(amount);
}

export function analyticsEditorStatusTone(
  status: AnalyticsEditorStatus,
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

export function pickAnalyticsEditorHighlights(
  items: ReadonlyArray<AnalyticsEditorItem>,
  limit = 3,
): AnalyticsEditorItem[] {
  return sortAnalyticsEditor(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
