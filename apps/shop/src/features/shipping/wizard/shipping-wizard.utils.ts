import { i18nPercent } from '../../../utils/i18n/i18n-percent';
import { validatePercent } from '../../../utils/validate/validate-percent';
import { formatSlug } from '../../../utils/format/format-slug';
import {
  emptyShippingWizardTotals,
  type ShippingWizardItem,
  type ShippingWizardStatus,
  type ShippingWizardTotals,
} from './shipping-wizard.model';

export type ShippingWizardSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalShippingWizard(
  items: ReadonlyArray<ShippingWizardItem>,
): ShippingWizardTotals {
  const totals = emptyShippingWizardTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupShippingWizardByStatus(
  items: ReadonlyArray<ShippingWizardItem>,
): Record<ShippingWizardStatus, ShippingWizardItem[]> {
  const grouped: Record<ShippingWizardStatus, ShippingWizardItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterShippingWizard(
  items: ReadonlyArray<ShippingWizardItem>,
  query: string,
): ShippingWizardItem[] {
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

export function sortShippingWizard(
  items: ReadonlyArray<ShippingWizardItem>,
  key: ShippingWizardSortKey,
  direction: 'asc' | 'desc' = 'asc',
): ShippingWizardItem[] {
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

export function describeShippingWizardItem(item: ShippingWizardItem): string {
  const amount = i18nPercent(item.amount);
  const name = formatSlug(validatePercent(item.name));
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatShippingWizardAmount(amount: number): string {
  return i18nPercent(amount);
}

export function shippingWizardStatusTone(
  status: ShippingWizardStatus,
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

export function pickShippingWizardHighlights(
  items: ReadonlyArray<ShippingWizardItem>,
  limit = 3,
): ShippingWizardItem[] {
  return sortShippingWizard(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
