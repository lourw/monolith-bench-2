import type { ChangeEvent } from 'react';
import { RETURNS_SETTINGS_FEATURE } from './returns-settings.routes';
import type { ReturnsSettingsSortKey } from './returns-settings.utils';

export interface ReturnsSettingsFiltersProps {
  query: string;
  sortKey: ReturnsSettingsSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: ReturnsSettingsSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: ReturnsSettingsSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function ReturnsSettingsFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: ReturnsSettingsFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as ReturnsSettingsSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter returns settings…"
        value={query}
        onChange={handleQuery}
        data-testid={`${RETURNS_SETTINGS_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${RETURNS_SETTINGS_FEATURE.testId}-sort`}
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
