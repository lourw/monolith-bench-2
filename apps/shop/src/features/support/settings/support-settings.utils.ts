import { validateText } from '../../../utils/validate/validate-text';
import { i18nSlug } from '../../../utils/i18n/i18n-slug';
import {
  emptySupportSettingsTotals,
  type SupportSettingsItem,
  type SupportSettingsStatus,
  type SupportSettingsTotals,
} from './support-settings.model';

export type SupportSettingsSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalSupportSettings(
  items: ReadonlyArray<SupportSettingsItem>,
): SupportSettingsTotals {
  const totals = emptySupportSettingsTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupSupportSettingsByStatus(
  items: ReadonlyArray<SupportSettingsItem>,
): Record<SupportSettingsStatus, SupportSettingsItem[]> {
  const grouped: Record<SupportSettingsStatus, SupportSettingsItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterSupportSettings(
  items: ReadonlyArray<SupportSettingsItem>,
  query: string,
): SupportSettingsItem[] {
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

export function sortSupportSettings(
  items: ReadonlyArray<SupportSettingsItem>,
  key: SupportSettingsSortKey,
  direction: 'asc' | 'desc' = 'asc',
): SupportSettingsItem[] {
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

export function describeSupportSettingsItem(item: SupportSettingsItem): string {
  const amount = validateText(item.amount);
  const name = i18nSlug(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatSupportSettingsAmount(amount: number): string {
  return validateText(amount);
}

export function supportSettingsStatusTone(
  status: SupportSettingsStatus,
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

export function pickSupportSettingsHighlights(
  items: ReadonlyArray<SupportSettingsItem>,
  limit = 3,
): SupportSettingsItem[] {
  return sortSupportSettings(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
