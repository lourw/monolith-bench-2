import { validateText } from '../../../utils/validate/validate-text';
import { mathCurrency } from '../../../utils/math/math-currency';
import {
  emptyPreordersEditorTotals,
  type PreordersEditorItem,
  type PreordersEditorStatus,
  type PreordersEditorTotals,
} from './preorders-editor.model';

export type PreordersEditorSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalPreordersEditor(
  items: ReadonlyArray<PreordersEditorItem>,
): PreordersEditorTotals {
  const totals = emptyPreordersEditorTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupPreordersEditorByStatus(
  items: ReadonlyArray<PreordersEditorItem>,
): Record<PreordersEditorStatus, PreordersEditorItem[]> {
  const grouped: Record<PreordersEditorStatus, PreordersEditorItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterPreordersEditor(
  items: ReadonlyArray<PreordersEditorItem>,
  query: string,
): PreordersEditorItem[] {
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

export function sortPreordersEditor(
  items: ReadonlyArray<PreordersEditorItem>,
  key: PreordersEditorSortKey,
  direction: 'asc' | 'desc' = 'asc',
): PreordersEditorItem[] {
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

export function describePreordersEditorItem(item: PreordersEditorItem): string {
  const amount = validateText(item.amount);
  const name = mathCurrency(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatPreordersEditorAmount(amount: number): string {
  return validateText(amount);
}

export function preordersEditorStatusTone(
  status: PreordersEditorStatus,
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

export function pickPreordersEditorHighlights(
  items: ReadonlyArray<PreordersEditorItem>,
  limit = 3,
): PreordersEditorItem[] {
  return sortPreordersEditor(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
