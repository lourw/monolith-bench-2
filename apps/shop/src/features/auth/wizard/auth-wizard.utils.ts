import { validateAddress } from '../../../utils/validate/validate-address';
import {
  emptyAuthWizardTotals,
  type AuthWizardItem,
  type AuthWizardStatus,
  type AuthWizardTotals,
} from './auth-wizard.model';

export type AuthWizardSortKey = 'name' | 'amount' | 'quantity' | 'createdAt';

export function totalAuthWizard(
  items: ReadonlyArray<AuthWizardItem>,
): AuthWizardTotals {
  const totals = emptyAuthWizardTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupAuthWizardByStatus(
  items: ReadonlyArray<AuthWizardItem>,
): Record<AuthWizardStatus, AuthWizardItem[]> {
  const grouped: Record<AuthWizardStatus, AuthWizardItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterAuthWizard(
  items: ReadonlyArray<AuthWizardItem>,
  query: string,
): AuthWizardItem[] {
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

export function sortAuthWizard(
  items: ReadonlyArray<AuthWizardItem>,
  key: AuthWizardSortKey,
  direction: 'asc' | 'desc' = 'asc',
): AuthWizardItem[] {
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

export function describeAuthWizardItem(item: AuthWizardItem): string {
  const amount = validateAddress(item.amount);
  const name = validateAddress(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatAuthWizardAmount(amount: number): string {
  return validateAddress(amount);
}

export function authWizardStatusTone(
  status: AuthWizardStatus,
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

export function pickAuthWizardHighlights(
  items: ReadonlyArray<AuthWizardItem>,
  limit = 3,
): AuthWizardItem[] {
  return sortAuthWizard(items, 'amount', 'desc').slice(0, Math.max(0, limit));
}
