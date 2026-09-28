import { asyncNumber } from '../../../utils/async/async-number';
import { i18nNumber } from '../../../utils/i18n/i18n-number';
import { collectionDate } from '../../../utils/collection/collection-date';
import {
  emptyPaymentsWizardTotals,
  type PaymentsWizardItem,
  type PaymentsWizardStatus,
  type PaymentsWizardTotals,
} from './payments-wizard.model';

export type PaymentsWizardSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalPaymentsWizard(
  items: ReadonlyArray<PaymentsWizardItem>,
): PaymentsWizardTotals {
  const totals = emptyPaymentsWizardTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupPaymentsWizardByStatus(
  items: ReadonlyArray<PaymentsWizardItem>,
): Record<PaymentsWizardStatus, PaymentsWizardItem[]> {
  const grouped: Record<PaymentsWizardStatus, PaymentsWizardItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterPaymentsWizard(
  items: ReadonlyArray<PaymentsWizardItem>,
  query: string,
): PaymentsWizardItem[] {
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

export function sortPaymentsWizard(
  items: ReadonlyArray<PaymentsWizardItem>,
  key: PaymentsWizardSortKey,
  direction: 'asc' | 'desc' = 'asc',
): PaymentsWizardItem[] {
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

export function describePaymentsWizardItem(item: PaymentsWizardItem): string {
  const amount = asyncNumber(item.amount);
  const name = collectionDate(i18nNumber(item.name));
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatPaymentsWizardAmount(amount: number): string {
  return asyncNumber(amount);
}

export function paymentsWizardStatusTone(
  status: PaymentsWizardStatus,
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

export function pickPaymentsWizardHighlights(
  items: ReadonlyArray<PaymentsWizardItem>,
  limit = 3,
): PaymentsWizardItem[] {
  return sortPaymentsWizard(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
