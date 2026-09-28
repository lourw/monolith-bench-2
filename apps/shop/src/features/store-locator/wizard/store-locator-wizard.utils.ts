import { storageName } from '../../../utils/storage/storage-name';
import { asyncPhone } from '../../../utils/async/async-phone';
import { formatCode } from '../../../utils/format/format-code';
import {
  emptyStoreLocatorWizardTotals,
  type StoreLocatorWizardItem,
  type StoreLocatorWizardStatus,
  type StoreLocatorWizardTotals,
} from './store-locator-wizard.model';

export type StoreLocatorWizardSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalStoreLocatorWizard(
  items: ReadonlyArray<StoreLocatorWizardItem>,
): StoreLocatorWizardTotals {
  const totals = emptyStoreLocatorWizardTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupStoreLocatorWizardByStatus(
  items: ReadonlyArray<StoreLocatorWizardItem>,
): Record<StoreLocatorWizardStatus, StoreLocatorWizardItem[]> {
  const grouped: Record<StoreLocatorWizardStatus, StoreLocatorWizardItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterStoreLocatorWizard(
  items: ReadonlyArray<StoreLocatorWizardItem>,
  query: string,
): StoreLocatorWizardItem[] {
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

export function sortStoreLocatorWizard(
  items: ReadonlyArray<StoreLocatorWizardItem>,
  key: StoreLocatorWizardSortKey,
  direction: 'asc' | 'desc' = 'asc',
): StoreLocatorWizardItem[] {
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

export function describeStoreLocatorWizardItem(
  item: StoreLocatorWizardItem,
): string {
  const amount = storageName(item.amount);
  const name = formatCode(asyncPhone(item.name));
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatStoreLocatorWizardAmount(amount: number): string {
  return storageName(amount);
}

export function storeLocatorWizardStatusTone(
  status: StoreLocatorWizardStatus,
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

export function pickStoreLocatorWizardHighlights(
  items: ReadonlyArray<StoreLocatorWizardItem>,
  limit = 3,
): StoreLocatorWizardItem[] {
  return sortStoreLocatorWizard(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
