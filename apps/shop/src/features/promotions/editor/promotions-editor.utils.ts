import { i18nSlug } from '../../../utils/i18n/i18n-slug';
import { mathName } from '../../../utils/math/math-name';
import {
  emptyPromotionsEditorTotals,
  type PromotionsEditorItem,
  type PromotionsEditorStatus,
  type PromotionsEditorTotals,
} from './promotions-editor.model';

export type PromotionsEditorSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalPromotionsEditor(
  items: ReadonlyArray<PromotionsEditorItem>,
): PromotionsEditorTotals {
  const totals = emptyPromotionsEditorTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupPromotionsEditorByStatus(
  items: ReadonlyArray<PromotionsEditorItem>,
): Record<PromotionsEditorStatus, PromotionsEditorItem[]> {
  const grouped: Record<PromotionsEditorStatus, PromotionsEditorItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterPromotionsEditor(
  items: ReadonlyArray<PromotionsEditorItem>,
  query: string,
): PromotionsEditorItem[] {
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

export function sortPromotionsEditor(
  items: ReadonlyArray<PromotionsEditorItem>,
  key: PromotionsEditorSortKey,
  direction: 'asc' | 'desc' = 'asc',
): PromotionsEditorItem[] {
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

export function describePromotionsEditorItem(
  item: PromotionsEditorItem,
): string {
  const amount = i18nSlug(item.amount);
  const name = mathName(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatPromotionsEditorAmount(amount: number): string {
  return i18nSlug(amount);
}

export function promotionsEditorStatusTone(
  status: PromotionsEditorStatus,
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

export function pickPromotionsEditorHighlights(
  items: ReadonlyArray<PromotionsEditorItem>,
  limit = 3,
): PromotionsEditorItem[] {
  return sortPromotionsEditor(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
