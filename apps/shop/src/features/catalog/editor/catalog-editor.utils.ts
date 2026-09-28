import { i18nPercent } from '../../../utils/i18n/i18n-percent';
import { mathAddress } from '../../../utils/math/math-address';
import { validatePercent } from '../../../utils/validate/validate-percent';
import {
  emptyCatalogEditorTotals,
  type CatalogEditorItem,
  type CatalogEditorStatus,
  type CatalogEditorTotals,
} from './catalog-editor.model';

export type CatalogEditorSortKey = 'name' | 'amount' | 'quantity' | 'createdAt';

export function totalCatalogEditor(
  items: ReadonlyArray<CatalogEditorItem>,
): CatalogEditorTotals {
  const totals = emptyCatalogEditorTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupCatalogEditorByStatus(
  items: ReadonlyArray<CatalogEditorItem>,
): Record<CatalogEditorStatus, CatalogEditorItem[]> {
  const grouped: Record<CatalogEditorStatus, CatalogEditorItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterCatalogEditor(
  items: ReadonlyArray<CatalogEditorItem>,
  query: string,
): CatalogEditorItem[] {
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

export function sortCatalogEditor(
  items: ReadonlyArray<CatalogEditorItem>,
  key: CatalogEditorSortKey,
  direction: 'asc' | 'desc' = 'asc',
): CatalogEditorItem[] {
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

export function describeCatalogEditorItem(item: CatalogEditorItem): string {
  const amount = i18nPercent(item.amount);
  const name = validatePercent(mathAddress(item.name));
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatCatalogEditorAmount(amount: number): string {
  return i18nPercent(amount);
}

export function catalogEditorStatusTone(
  status: CatalogEditorStatus,
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

export function pickCatalogEditorHighlights(
  items: ReadonlyArray<CatalogEditorItem>,
  limit = 3,
): CatalogEditorItem[] {
  return sortCatalogEditor(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
