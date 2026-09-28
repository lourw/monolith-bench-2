import type { ChangeEvent } from 'react';
import { NOTIFICATIONS_SETTINGS_FEATURE } from './notifications-settings.routes';
import type { NotificationsSettingsSortKey } from './notifications-settings.utils';

export interface NotificationsSettingsFiltersProps {
  query: string;
  sortKey: NotificationsSettingsSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: NotificationsSettingsSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: NotificationsSettingsSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function NotificationsSettingsFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: NotificationsSettingsFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as NotificationsSettingsSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter notifications settings…"
        value={query}
        onChange={handleQuery}
        data-testid={`${NOTIFICATIONS_SETTINGS_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${NOTIFICATIONS_SETTINGS_FEATURE.testId}-sort`}
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
