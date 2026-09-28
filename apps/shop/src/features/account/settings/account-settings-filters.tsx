import type { ChangeEvent } from 'react';
import { ACCOUNT_SETTINGS_FEATURE } from './account-settings.routes';
import type { AccountSettingsSortKey } from './account-settings.utils';

export interface AccountSettingsFiltersProps {
  query: string;
  sortKey: AccountSettingsSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: AccountSettingsSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: AccountSettingsSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function AccountSettingsFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: AccountSettingsFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as AccountSettingsSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter account settings…"
        value={query}
        onChange={handleQuery}
        data-testid={`${ACCOUNT_SETTINGS_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${ACCOUNT_SETTINGS_FEATURE.testId}-sort`}
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
