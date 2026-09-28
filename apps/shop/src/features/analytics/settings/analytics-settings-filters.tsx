import type { ChangeEvent } from 'react';
import { ANALYTICS_SETTINGS_FEATURE } from './analytics-settings.routes';
import type { AnalyticsSettingsSortKey } from './analytics-settings.utils';

export interface AnalyticsSettingsFiltersProps {
  query: string;
  sortKey: AnalyticsSettingsSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: AnalyticsSettingsSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: AnalyticsSettingsSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function AnalyticsSettingsFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: AnalyticsSettingsFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as AnalyticsSettingsSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter analytics settings…"
        value={query}
        onChange={handleQuery}
        data-testid={`${ANALYTICS_SETTINGS_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${ANALYTICS_SETTINGS_FEATURE.testId}-sort`}
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
