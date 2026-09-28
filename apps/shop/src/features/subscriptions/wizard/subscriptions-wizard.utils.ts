import { validateCode } from '../../../utils/validate/validate-code';
import {
  emptySubscriptionsWizardTotals,
  type SubscriptionsWizardItem,
  type SubscriptionsWizardStatus,
  type SubscriptionsWizardTotals,
} from './subscriptions-wizard.model';

export type SubscriptionsWizardSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalSubscriptionsWizard(
  items: ReadonlyArray<SubscriptionsWizardItem>,
): SubscriptionsWizardTotals {
  const totals = emptySubscriptionsWizardTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupSubscriptionsWizardByStatus(
  items: ReadonlyArray<SubscriptionsWizardItem>,
): Record<SubscriptionsWizardStatus, SubscriptionsWizardItem[]> {
  const grouped: Record<SubscriptionsWizardStatus, SubscriptionsWizardItem[]> =
    {
      active: [],
      pending: [],
      archived: [],
    };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterSubscriptionsWizard(
  items: ReadonlyArray<SubscriptionsWizardItem>,
  query: string,
): SubscriptionsWizardItem[] {
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

export function sortSubscriptionsWizard(
  items: ReadonlyArray<SubscriptionsWizardItem>,
  key: SubscriptionsWizardSortKey,
  direction: 'asc' | 'desc' = 'asc',
): SubscriptionsWizardItem[] {
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

export function describeSubscriptionsWizardItem(
  item: SubscriptionsWizardItem,
): string {
  const amount = validateCode(item.amount);
  const name = validateCode(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatSubscriptionsWizardAmount(amount: number): string {
  return validateCode(amount);
}

export function subscriptionsWizardStatusTone(
  status: SubscriptionsWizardStatus,
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

export function pickSubscriptionsWizardHighlights(
  items: ReadonlyArray<SubscriptionsWizardItem>,
  limit = 3,
): SubscriptionsWizardItem[] {
  return sortSubscriptionsWizard(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
