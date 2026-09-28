import { asyncPercent } from '../../../utils/async/async-percent';
import { validatePhone } from '../../../utils/validate/validate-phone';
import { mathDate } from '../../../utils/math/math-date';
import {
  emptyLoyaltyEditorTotals,
  type LoyaltyEditorItem,
  type LoyaltyEditorStatus,
  type LoyaltyEditorTotals,
} from './loyalty-editor.model';

export type LoyaltyEditorSortKey = 'name' | 'amount' | 'quantity' | 'createdAt';

export function totalLoyaltyEditor(
  items: ReadonlyArray<LoyaltyEditorItem>,
): LoyaltyEditorTotals {
  const totals = emptyLoyaltyEditorTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupLoyaltyEditorByStatus(
  items: ReadonlyArray<LoyaltyEditorItem>,
): Record<LoyaltyEditorStatus, LoyaltyEditorItem[]> {
  const grouped: Record<LoyaltyEditorStatus, LoyaltyEditorItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterLoyaltyEditor(
  items: ReadonlyArray<LoyaltyEditorItem>,
  query: string,
): LoyaltyEditorItem[] {
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

export function sortLoyaltyEditor(
  items: ReadonlyArray<LoyaltyEditorItem>,
  key: LoyaltyEditorSortKey,
  direction: 'asc' | 'desc' = 'asc',
): LoyaltyEditorItem[] {
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

export function describeLoyaltyEditorItem(item: LoyaltyEditorItem): string {
  const amount = asyncPercent(item.amount);
  const name = mathDate(validatePhone(item.name));
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatLoyaltyEditorAmount(amount: number): string {
  return asyncPercent(amount);
}

export function loyaltyEditorStatusTone(
  status: LoyaltyEditorStatus,
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

export function pickLoyaltyEditorHighlights(
  items: ReadonlyArray<LoyaltyEditorItem>,
  limit = 3,
): LoyaltyEditorItem[] {
  return sortLoyaltyEditor(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
