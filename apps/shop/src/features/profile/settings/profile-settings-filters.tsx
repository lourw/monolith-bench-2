import type { ChangeEvent } from 'react';
import { PROFILE_SETTINGS_FEATURE } from './profile-settings.routes';
import type { ProfileSettingsSortKey } from './profile-settings.utils';

export interface ProfileSettingsFiltersProps {
  query: string;
  sortKey: ProfileSettingsSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: ProfileSettingsSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: ProfileSettingsSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function ProfileSettingsFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: ProfileSettingsFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as ProfileSettingsSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter profile settings…"
        value={query}
        onChange={handleQuery}
        data-testid={`${PROFILE_SETTINGS_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${PROFILE_SETTINGS_FEATURE.testId}-sort`}
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
