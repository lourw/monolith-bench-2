import { storageCurrency } from '../../../utils/storage/storage-currency';
import {
  emptyProfileEditorTotals,
  type ProfileEditorItem,
  type ProfileEditorStatus,
  type ProfileEditorTotals,
} from './profile-editor.model';

export type ProfileEditorSortKey = 'name' | 'amount' | 'quantity' | 'createdAt';

export function totalProfileEditor(
  items: ReadonlyArray<ProfileEditorItem>,
): ProfileEditorTotals {
  const totals = emptyProfileEditorTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupProfileEditorByStatus(
  items: ReadonlyArray<ProfileEditorItem>,
): Record<ProfileEditorStatus, ProfileEditorItem[]> {
  const grouped: Record<ProfileEditorStatus, ProfileEditorItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterProfileEditor(
  items: ReadonlyArray<ProfileEditorItem>,
  query: string,
): ProfileEditorItem[] {
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

export function sortProfileEditor(
  items: ReadonlyArray<ProfileEditorItem>,
  key: ProfileEditorSortKey,
  direction: 'asc' | 'desc' = 'asc',
): ProfileEditorItem[] {
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

export function describeProfileEditorItem(item: ProfileEditorItem): string {
  const amount = storageCurrency(item.amount);
  const name = storageCurrency(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatProfileEditorAmount(amount: number): string {
  return storageCurrency(amount);
}

export function profileEditorStatusTone(
  status: ProfileEditorStatus,
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

export function pickProfileEditorHighlights(
  items: ReadonlyArray<ProfileEditorItem>,
  limit = 3,
): ProfileEditorItem[] {
  return sortProfileEditor(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
