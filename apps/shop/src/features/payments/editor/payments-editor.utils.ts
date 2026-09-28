import { validateAddress } from '../../../utils/validate/validate-address';
import { mathPercent } from '../../../utils/math/math-percent';
import { i18nAddress } from '../../../utils/i18n/i18n-address';
import {
  emptyPaymentsEditorTotals,
  type PaymentsEditorItem,
  type PaymentsEditorStatus,
  type PaymentsEditorTotals,
} from './payments-editor.model';

export type PaymentsEditorSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalPaymentsEditor(
  items: ReadonlyArray<PaymentsEditorItem>,
): PaymentsEditorTotals {
  const totals = emptyPaymentsEditorTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupPaymentsEditorByStatus(
  items: ReadonlyArray<PaymentsEditorItem>,
): Record<PaymentsEditorStatus, PaymentsEditorItem[]> {
  const grouped: Record<PaymentsEditorStatus, PaymentsEditorItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterPaymentsEditor(
  items: ReadonlyArray<PaymentsEditorItem>,
  query: string,
): PaymentsEditorItem[] {
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

export function sortPaymentsEditor(
  items: ReadonlyArray<PaymentsEditorItem>,
  key: PaymentsEditorSortKey,
  direction: 'asc' | 'desc' = 'asc',
): PaymentsEditorItem[] {
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

export function describePaymentsEditorItem(item: PaymentsEditorItem): string {
  const amount = validateAddress(item.amount);
  const name = i18nAddress(mathPercent(item.name));
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatPaymentsEditorAmount(amount: number): string {
  return validateAddress(amount);
}

export function paymentsEditorStatusTone(
  status: PaymentsEditorStatus,
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

export function pickPaymentsEditorHighlights(
  items: ReadonlyArray<PaymentsEditorItem>,
  limit = 3,
): PaymentsEditorItem[] {
  return sortPaymentsEditor(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
