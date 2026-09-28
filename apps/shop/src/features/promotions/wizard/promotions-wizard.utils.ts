import { mathAddress } from '../../../utils/math/math-address';
import { validateName } from '../../../utils/validate/validate-name';
import {
  emptyPromotionsWizardTotals,
  type PromotionsWizardItem,
  type PromotionsWizardStatus,
  type PromotionsWizardTotals,
} from './promotions-wizard.model';

export type PromotionsWizardSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalPromotionsWizard(
  items: ReadonlyArray<PromotionsWizardItem>,
): PromotionsWizardTotals {
  const totals = emptyPromotionsWizardTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupPromotionsWizardByStatus(
  items: ReadonlyArray<PromotionsWizardItem>,
): Record<PromotionsWizardStatus, PromotionsWizardItem[]> {
  const grouped: Record<PromotionsWizardStatus, PromotionsWizardItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterPromotionsWizard(
  items: ReadonlyArray<PromotionsWizardItem>,
  query: string,
): PromotionsWizardItem[] {
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

export function sortPromotionsWizard(
  items: ReadonlyArray<PromotionsWizardItem>,
  key: PromotionsWizardSortKey,
  direction: 'asc' | 'desc' = 'asc',
): PromotionsWizardItem[] {
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

export function describePromotionsWizardItem(
  item: PromotionsWizardItem,
): string {
  const amount = mathAddress(item.amount);
  const name = validateName(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatPromotionsWizardAmount(amount: number): string {
  return mathAddress(amount);
}

export function promotionsWizardStatusTone(
  status: PromotionsWizardStatus,
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

export function pickPromotionsWizardHighlights(
  items: ReadonlyArray<PromotionsWizardItem>,
  limit = 3,
): PromotionsWizardItem[] {
  return sortPromotionsWizard(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
