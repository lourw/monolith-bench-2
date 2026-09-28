import type { ChangeEvent } from 'react';
import { PROFILE_INSIGHTS_FEATURE } from './profile-insights.routes';
import type { ProfileInsightsSortKey } from './profile-insights.utils';

export interface ProfileInsightsFiltersProps {
  query: string;
  sortKey: ProfileInsightsSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: ProfileInsightsSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: ProfileInsightsSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function ProfileInsightsFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: ProfileInsightsFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as ProfileInsightsSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter profile insights…"
        value={query}
        onChange={handleQuery}
        data-testid={`${PROFILE_INSIGHTS_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${PROFILE_INSIGHTS_FEATURE.testId}-sort`}
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
