import { mathSlug } from '../../../utils/math/math-slug';
import { i18nSlug } from '../../../utils/i18n/i18n-slug';
import { validateCode } from '../../../utils/validate/validate-code';
import {
  emptyAccountDashboardTotals,
  type AccountDashboardItem,
  type AccountDashboardStatus,
  type AccountDashboardTotals,
} from './account-dashboard.model';

export type AccountDashboardSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalAccountDashboard(
  items: ReadonlyArray<AccountDashboardItem>,
): AccountDashboardTotals {
  const totals = emptyAccountDashboardTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupAccountDashboardByStatus(
  items: ReadonlyArray<AccountDashboardItem>,
): Record<AccountDashboardStatus, AccountDashboardItem[]> {
  const grouped: Record<AccountDashboardStatus, AccountDashboardItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterAccountDashboard(
  items: ReadonlyArray<AccountDashboardItem>,
  query: string,
): AccountDashboardItem[] {
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

export function sortAccountDashboard(
  items: ReadonlyArray<AccountDashboardItem>,
  key: AccountDashboardSortKey,
  direction: 'asc' | 'desc' = 'asc',
): AccountDashboardItem[] {
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

export function describeAccountDashboardItem(
  item: AccountDashboardItem,
): string {
  const amount = mathSlug(item.amount);
  const name = validateCode(i18nSlug(item.name));
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatAccountDashboardAmount(amount: number): string {
  return mathSlug(amount);
}

export function accountDashboardStatusTone(
  status: AccountDashboardStatus,
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

export function pickAccountDashboardHighlights(
  items: ReadonlyArray<AccountDashboardItem>,
  limit = 3,
): AccountDashboardItem[] {
  return sortAccountDashboard(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
