import { asyncCode } from '../../../utils/async/async-code';
import { i18nText } from '../../../utils/i18n/i18n-text';
import {
  emptyNotificationsWizardTotals,
  type NotificationsWizardItem,
  type NotificationsWizardStatus,
  type NotificationsWizardTotals,
} from './notifications-wizard.model';

export type NotificationsWizardSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalNotificationsWizard(
  items: ReadonlyArray<NotificationsWizardItem>,
): NotificationsWizardTotals {
  const totals = emptyNotificationsWizardTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupNotificationsWizardByStatus(
  items: ReadonlyArray<NotificationsWizardItem>,
): Record<NotificationsWizardStatus, NotificationsWizardItem[]> {
  const grouped: Record<NotificationsWizardStatus, NotificationsWizardItem[]> =
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

export function filterNotificationsWizard(
  items: ReadonlyArray<NotificationsWizardItem>,
  query: string,
): NotificationsWizardItem[] {
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

export function sortNotificationsWizard(
  items: ReadonlyArray<NotificationsWizardItem>,
  key: NotificationsWizardSortKey,
  direction: 'asc' | 'desc' = 'asc',
): NotificationsWizardItem[] {
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

export function describeNotificationsWizardItem(
  item: NotificationsWizardItem,
): string {
  const amount = asyncCode(item.amount);
  const name = i18nText(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatNotificationsWizardAmount(amount: number): string {
  return asyncCode(amount);
}

export function notificationsWizardStatusTone(
  status: NotificationsWizardStatus,
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

export function pickNotificationsWizardHighlights(
  items: ReadonlyArray<NotificationsWizardItem>,
  limit = 3,
): NotificationsWizardItem[] {
  return sortNotificationsWizard(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
