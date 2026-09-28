import { i18nCode } from '../../../utils/i18n/i18n-code';
import {
  emptyAddressesWizardTotals,
  type AddressesWizardItem,
  type AddressesWizardStatus,
  type AddressesWizardTotals,
} from './addresses-wizard.model';

export type AddressesWizardSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalAddressesWizard(
  items: ReadonlyArray<AddressesWizardItem>,
): AddressesWizardTotals {
  const totals = emptyAddressesWizardTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupAddressesWizardByStatus(
  items: ReadonlyArray<AddressesWizardItem>,
): Record<AddressesWizardStatus, AddressesWizardItem[]> {
  const grouped: Record<AddressesWizardStatus, AddressesWizardItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterAddressesWizard(
  items: ReadonlyArray<AddressesWizardItem>,
  query: string,
): AddressesWizardItem[] {
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

export function sortAddressesWizard(
  items: ReadonlyArray<AddressesWizardItem>,
  key: AddressesWizardSortKey,
  direction: 'asc' | 'desc' = 'asc',
): AddressesWizardItem[] {
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

export function describeAddressesWizardItem(item: AddressesWizardItem): string {
  const amount = i18nCode(item.amount);
  const name = i18nCode(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatAddressesWizardAmount(amount: number): string {
  return i18nCode(amount);
}

export function addressesWizardStatusTone(
  status: AddressesWizardStatus,
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

export function pickAddressesWizardHighlights(
  items: ReadonlyArray<AddressesWizardItem>,
  limit = 3,
): AddressesWizardItem[] {
  return sortAddressesWizard(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
