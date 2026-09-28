import { collectionNumber } from '../../../utils/collection/collection-number';
import {
  emptyAccountWizardTotals,
  type AccountWizardItem,
  type AccountWizardStatus,
  type AccountWizardTotals,
} from './account-wizard.model';

export type AccountWizardSortKey = 'name' | 'amount' | 'quantity' | 'createdAt';

export function totalAccountWizard(
  items: ReadonlyArray<AccountWizardItem>,
): AccountWizardTotals {
  const totals = emptyAccountWizardTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupAccountWizardByStatus(
  items: ReadonlyArray<AccountWizardItem>,
): Record<AccountWizardStatus, AccountWizardItem[]> {
  const grouped: Record<AccountWizardStatus, AccountWizardItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterAccountWizard(
  items: ReadonlyArray<AccountWizardItem>,
  query: string,
): AccountWizardItem[] {
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

export function sortAccountWizard(
  items: ReadonlyArray<AccountWizardItem>,
  key: AccountWizardSortKey,
  direction: 'asc' | 'desc' = 'asc',
): AccountWizardItem[] {
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

export function describeAccountWizardItem(item: AccountWizardItem): string {
  const amount = collectionNumber(item.amount);
  const name = collectionNumber(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatAccountWizardAmount(amount: number): string {
  return collectionNumber(amount);
}

export function accountWizardStatusTone(
  status: AccountWizardStatus,
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

export function pickAccountWizardHighlights(
  items: ReadonlyArray<AccountWizardItem>,
  limit = 3,
): AccountWizardItem[] {
  return sortAccountWizard(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
