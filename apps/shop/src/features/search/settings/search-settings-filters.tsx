import type { ChangeEvent } from 'react';
import { SEARCH_SETTINGS_FEATURE } from './search-settings.routes';
import type { SearchSettingsSortKey } from './search-settings.utils';

export interface SearchSettingsFiltersProps {
  query: string;
  sortKey: SearchSettingsSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: SearchSettingsSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: SearchSettingsSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function SearchSettingsFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: SearchSettingsFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as SearchSettingsSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter search settings…"
        value={query}
        onChange={handleQuery}
        data-testid={`${SEARCH_SETTINGS_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${SEARCH_SETTINGS_FEATURE.testId}-sort`}
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
