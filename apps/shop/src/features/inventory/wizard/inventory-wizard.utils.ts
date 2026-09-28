import { storageCode } from '../../../utils/storage/storage-code';
import { mathText } from '../../../utils/math/math-text';
import { validatePhone } from '../../../utils/validate/validate-phone';
import {
  emptyInventoryWizardTotals,
  type InventoryWizardItem,
  type InventoryWizardStatus,
  type InventoryWizardTotals,
} from './inventory-wizard.model';

export type InventoryWizardSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalInventoryWizard(
  items: ReadonlyArray<InventoryWizardItem>,
): InventoryWizardTotals {
  const totals = emptyInventoryWizardTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupInventoryWizardByStatus(
  items: ReadonlyArray<InventoryWizardItem>,
): Record<InventoryWizardStatus, InventoryWizardItem[]> {
  const grouped: Record<InventoryWizardStatus, InventoryWizardItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterInventoryWizard(
  items: ReadonlyArray<InventoryWizardItem>,
  query: string,
): InventoryWizardItem[] {
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

export function sortInventoryWizard(
  items: ReadonlyArray<InventoryWizardItem>,
  key: InventoryWizardSortKey,
  direction: 'asc' | 'desc' = 'asc',
): InventoryWizardItem[] {
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

export function describeInventoryWizardItem(item: InventoryWizardItem): string {
  const amount = storageCode(item.amount);
  const name = validatePhone(mathText(item.name));
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatInventoryWizardAmount(amount: number): string {
  return storageCode(amount);
}

export function inventoryWizardStatusTone(
  status: InventoryWizardStatus,
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

export function pickInventoryWizardHighlights(
  items: ReadonlyArray<InventoryWizardItem>,
  limit = 3,
): InventoryWizardItem[] {
  return sortInventoryWizard(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
