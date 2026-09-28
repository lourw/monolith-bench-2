import { storageNumber } from '../../../utils/storage/storage-number';
import { formatCode } from '../../../utils/format/format-code';
import {
  emptyCatalogWizardTotals,
  type CatalogWizardItem,
  type CatalogWizardStatus,
  type CatalogWizardTotals,
} from './catalog-wizard.model';

export type CatalogWizardSortKey = 'name' | 'amount' | 'quantity' | 'createdAt';

export function totalCatalogWizard(
  items: ReadonlyArray<CatalogWizardItem>,
): CatalogWizardTotals {
  const totals = emptyCatalogWizardTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupCatalogWizardByStatus(
  items: ReadonlyArray<CatalogWizardItem>,
): Record<CatalogWizardStatus, CatalogWizardItem[]> {
  const grouped: Record<CatalogWizardStatus, CatalogWizardItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterCatalogWizard(
  items: ReadonlyArray<CatalogWizardItem>,
  query: string,
): CatalogWizardItem[] {
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

export function sortCatalogWizard(
  items: ReadonlyArray<CatalogWizardItem>,
  key: CatalogWizardSortKey,
  direction: 'asc' | 'desc' = 'asc',
): CatalogWizardItem[] {
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

export function describeCatalogWizardItem(item: CatalogWizardItem): string {
  const amount = storageNumber(item.amount);
  const name = formatCode(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatCatalogWizardAmount(amount: number): string {
  return storageNumber(amount);
}

export function catalogWizardStatusTone(
  status: CatalogWizardStatus,
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

export function pickCatalogWizardHighlights(
  items: ReadonlyArray<CatalogWizardItem>,
  limit = 3,
): CatalogWizardItem[] {
  return sortCatalogWizard(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
