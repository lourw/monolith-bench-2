import { i18nPhone } from '../../../utils/i18n/i18n-phone';
import { formatAddress } from '../../../utils/format/format-address';
import { asyncNumber } from '../../../utils/async/async-number';
import {
  emptyNotificationsEditorTotals,
  type NotificationsEditorItem,
  type NotificationsEditorStatus,
  type NotificationsEditorTotals,
} from './notifications-editor.model';

export type NotificationsEditorSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalNotificationsEditor(
  items: ReadonlyArray<NotificationsEditorItem>,
): NotificationsEditorTotals {
  const totals = emptyNotificationsEditorTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupNotificationsEditorByStatus(
  items: ReadonlyArray<NotificationsEditorItem>,
): Record<NotificationsEditorStatus, NotificationsEditorItem[]> {
  const grouped: Record<NotificationsEditorStatus, NotificationsEditorItem[]> =
    {
      active: [],
      pending: [],
      archived: [],
    };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterNotificationsEditor(
  items: ReadonlyArray<NotificationsEditorItem>,
  query: string,
): NotificationsEditorItem[] {
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

export function sortNotificationsEditor(
  items: ReadonlyArray<NotificationsEditorItem>,
  key: NotificationsEditorSortKey,
  direction: 'asc' | 'desc' = 'asc',
): NotificationsEditorItem[] {
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

export function describeNotificationsEditorItem(
  item: NotificationsEditorItem,
): string {
  const amount = i18nPhone(item.amount);
  const name = asyncNumber(formatAddress(item.name));
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatNotificationsEditorAmount(amount: number): string {
  return i18nPhone(amount);
}

export function notificationsEditorStatusTone(
  status: NotificationsEditorStatus,
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

export function pickNotificationsEditorHighlights(
  items: ReadonlyArray<NotificationsEditorItem>,
  limit = 3,
): NotificationsEditorItem[] {
  return sortNotificationsEditor(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
