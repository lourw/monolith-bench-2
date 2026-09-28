import { storageName } from '../../../utils/storage/storage-name';
import {
  emptyCheckoutWizardTotals,
  type CheckoutWizardItem,
  type CheckoutWizardStatus,
  type CheckoutWizardTotals,
} from './checkout-wizard.model';

export type CheckoutWizardSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalCheckoutWizard(
  items: ReadonlyArray<CheckoutWizardItem>,
): CheckoutWizardTotals {
  const totals = emptyCheckoutWizardTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupCheckoutWizardByStatus(
  items: ReadonlyArray<CheckoutWizardItem>,
): Record<CheckoutWizardStatus, CheckoutWizardItem[]> {
  const grouped: Record<CheckoutWizardStatus, CheckoutWizardItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterCheckoutWizard(
  items: ReadonlyArray<CheckoutWizardItem>,
  query: string,
): CheckoutWizardItem[] {
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

export function sortCheckoutWizard(
  items: ReadonlyArray<CheckoutWizardItem>,
  key: CheckoutWizardSortKey,
  direction: 'asc' | 'desc' = 'asc',
): CheckoutWizardItem[] {
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

export function describeCheckoutWizardItem(item: CheckoutWizardItem): string {
  const amount = storageName(item.amount);
  const name = storageName(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatCheckoutWizardAmount(amount: number): string {
  return storageName(amount);
}

export function checkoutWizardStatusTone(
  status: CheckoutWizardStatus,
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

export function pickCheckoutWizardHighlights(
  items: ReadonlyArray<CheckoutWizardItem>,
  limit = 3,
): CheckoutWizardItem[] {
  return sortCheckoutWizard(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
