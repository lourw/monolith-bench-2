import type { ChangeEvent } from 'react';
import { RECOMMENDATIONS_SETTINGS_FEATURE } from './recommendations-settings.routes';
import type { RecommendationsSettingsSortKey } from './recommendations-settings.utils';

export interface RecommendationsSettingsFiltersProps {
  query: string;
  sortKey: RecommendationsSettingsSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: RecommendationsSettingsSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: RecommendationsSettingsSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function RecommendationsSettingsFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: RecommendationsSettingsFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as RecommendationsSettingsSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter recommendations settings…"
        value={query}
        onChange={handleQuery}
        data-testid={`${RECOMMENDATIONS_SETTINGS_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${RECOMMENDATIONS_SETTINGS_FEATURE.testId}-sort`}
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
