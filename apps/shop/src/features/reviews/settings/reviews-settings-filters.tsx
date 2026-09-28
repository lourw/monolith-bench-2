import type { ChangeEvent } from 'react';
import { REVIEWS_SETTINGS_FEATURE } from './reviews-settings.routes';
import type { ReviewsSettingsSortKey } from './reviews-settings.utils';

export interface ReviewsSettingsFiltersProps {
  query: string;
  sortKey: ReviewsSettingsSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: ReviewsSettingsSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: ReviewsSettingsSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function ReviewsSettingsFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: ReviewsSettingsFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as ReviewsSettingsSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter reviews settings…"
        value={query}
        onChange={handleQuery}
        data-testid={`${REVIEWS_SETTINGS_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${REVIEWS_SETTINGS_FEATURE.testId}-sort`}
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
