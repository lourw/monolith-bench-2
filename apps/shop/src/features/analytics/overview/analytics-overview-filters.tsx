import type { ChangeEvent } from 'react';
import { ANALYTICS_OVERVIEW_FEATURE } from './analytics-overview.routes';
import type { AnalyticsOverviewSortKey } from './analytics-overview.utils';

export interface AnalyticsOverviewFiltersProps {
  query: string;
  sortKey: AnalyticsOverviewSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: AnalyticsOverviewSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: AnalyticsOverviewSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function AnalyticsOverviewFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: AnalyticsOverviewFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as AnalyticsOverviewSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter analytics overview…"
        value={query}
        onChange={handleQuery}
        data-testid={`${ANALYTICS_OVERVIEW_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${ANALYTICS_OVERVIEW_FEATURE.testId}-sort`}
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
