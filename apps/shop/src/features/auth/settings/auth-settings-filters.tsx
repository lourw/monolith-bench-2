import type { ChangeEvent } from 'react';
import { AUTH_SETTINGS_FEATURE } from './auth-settings.routes';
import type { AuthSettingsSortKey } from './auth-settings.utils';

export interface AuthSettingsFiltersProps {
  query: string;
  sortKey: AuthSettingsSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: AuthSettingsSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: AuthSettingsSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function AuthSettingsFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: AuthSettingsFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as AuthSettingsSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter auth settings…"
        value={query}
        onChange={handleQuery}
        data-testid={`${AUTH_SETTINGS_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${AUTH_SETTINGS_FEATURE.testId}-sort`}
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
