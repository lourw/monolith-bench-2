import { collectionCode } from '../../../utils/collection/collection-code';
import {
  emptyLoyaltyWizardTotals,
  type LoyaltyWizardItem,
  type LoyaltyWizardStatus,
  type LoyaltyWizardTotals,
} from './loyalty-wizard.model';

export type LoyaltyWizardSortKey = 'name' | 'amount' | 'quantity' | 'createdAt';

export function totalLoyaltyWizard(
  items: ReadonlyArray<LoyaltyWizardItem>,
): LoyaltyWizardTotals {
  const totals = emptyLoyaltyWizardTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupLoyaltyWizardByStatus(
  items: ReadonlyArray<LoyaltyWizardItem>,
): Record<LoyaltyWizardStatus, LoyaltyWizardItem[]> {
  const grouped: Record<LoyaltyWizardStatus, LoyaltyWizardItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterLoyaltyWizard(
  items: ReadonlyArray<LoyaltyWizardItem>,
  query: string,
): LoyaltyWizardItem[] {
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

export function sortLoyaltyWizard(
  items: ReadonlyArray<LoyaltyWizardItem>,
  key: LoyaltyWizardSortKey,
  direction: 'asc' | 'desc' = 'asc',
): LoyaltyWizardItem[] {
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

export function describeLoyaltyWizardItem(item: LoyaltyWizardItem): string {
  const amount = collectionCode(item.amount);
  const name = collectionCode(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatLoyaltyWizardAmount(amount: number): string {
  return collectionCode(amount);
}

export function loyaltyWizardStatusTone(
  status: LoyaltyWizardStatus,
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

export function pickLoyaltyWizardHighlights(
  items: ReadonlyArray<LoyaltyWizardItem>,
  limit = 3,
): LoyaltyWizardItem[] {
  return sortLoyaltyWizard(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
