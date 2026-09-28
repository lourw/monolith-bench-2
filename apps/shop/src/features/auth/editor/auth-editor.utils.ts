import { collectionSlug } from '../../../utils/collection/collection-slug';
import {
  emptyAuthEditorTotals,
  type AuthEditorItem,
  type AuthEditorStatus,
  type AuthEditorTotals,
} from './auth-editor.model';

export type AuthEditorSortKey = 'name' | 'amount' | 'quantity' | 'createdAt';

export function totalAuthEditor(
  items: ReadonlyArray<AuthEditorItem>,
): AuthEditorTotals {
  const totals = emptyAuthEditorTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupAuthEditorByStatus(
  items: ReadonlyArray<AuthEditorItem>,
): Record<AuthEditorStatus, AuthEditorItem[]> {
  const grouped: Record<AuthEditorStatus, AuthEditorItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterAuthEditor(
  items: ReadonlyArray<AuthEditorItem>,
  query: string,
): AuthEditorItem[] {
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

export function sortAuthEditor(
  items: ReadonlyArray<AuthEditorItem>,
  key: AuthEditorSortKey,
  direction: 'asc' | 'desc' = 'asc',
): AuthEditorItem[] {
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

export function describeAuthEditorItem(item: AuthEditorItem): string {
  const amount = collectionSlug(item.amount);
  const name = collectionSlug(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatAuthEditorAmount(amount: number): string {
  return collectionSlug(amount);
}

export function authEditorStatusTone(
  status: AuthEditorStatus,
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

export function pickAuthEditorHighlights(
  items: ReadonlyArray<AuthEditorItem>,
  limit = 3,
): AuthEditorItem[] {
  return sortAuthEditor(items, 'amount', 'desc').slice(0, Math.max(0, limit));
}
