import { validateNumber } from '../../../utils/validate/validate-number';
import { validateCode } from '../../../utils/validate/validate-code';
import {
  emptyAccountEditorTotals,
  type AccountEditorItem,
  type AccountEditorStatus,
  type AccountEditorTotals,
} from './account-editor.model';

export type AccountEditorSortKey = 'name' | 'amount' | 'quantity' | 'createdAt';

export function totalAccountEditor(
  items: ReadonlyArray<AccountEditorItem>,
): AccountEditorTotals {
  const totals = emptyAccountEditorTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupAccountEditorByStatus(
  items: ReadonlyArray<AccountEditorItem>,
): Record<AccountEditorStatus, AccountEditorItem[]> {
  const grouped: Record<AccountEditorStatus, AccountEditorItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterAccountEditor(
  items: ReadonlyArray<AccountEditorItem>,
  query: string,
): AccountEditorItem[] {
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

export function sortAccountEditor(
  items: ReadonlyArray<AccountEditorItem>,
  key: AccountEditorSortKey,
  direction: 'asc' | 'desc' = 'asc',
): AccountEditorItem[] {
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

export function describeAccountEditorItem(item: AccountEditorItem): string {
  const amount = validateNumber(item.amount);
  const name = validateCode(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatAccountEditorAmount(amount: number): string {
  return validateNumber(amount);
}

export function accountEditorStatusTone(
  status: AccountEditorStatus,
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

export function pickAccountEditorHighlights(
  items: ReadonlyArray<AccountEditorItem>,
  limit = 3,
): AccountEditorItem[] {
  return sortAccountEditor(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
