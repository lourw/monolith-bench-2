import type { ChangeEvent } from 'react';
import { ANALYTICS_DETAILS_FEATURE } from './analytics-details.routes';
import type { AnalyticsDetailsSortKey } from './analytics-details.utils';

export interface AnalyticsDetailsFiltersProps {
  query: string;
  sortKey: AnalyticsDetailsSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: AnalyticsDetailsSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: AnalyticsDetailsSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function AnalyticsDetailsFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: AnalyticsDetailsFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as AnalyticsDetailsSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter analytics details…"
        value={query}
        onChange={handleQuery}
        data-testid={`${ANALYTICS_DETAILS_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${ANALYTICS_DETAILS_FEATURE.testId}-sort`}
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
