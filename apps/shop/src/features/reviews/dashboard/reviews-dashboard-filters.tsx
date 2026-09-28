import type { ChangeEvent } from 'react';
import { REVIEWS_DASHBOARD_FEATURE } from './reviews-dashboard.routes';
import type { ReviewsDashboardSortKey } from './reviews-dashboard.utils';

export interface ReviewsDashboardFiltersProps {
  query: string;
  sortKey: ReviewsDashboardSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: ReviewsDashboardSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: ReviewsDashboardSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function ReviewsDashboardFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: ReviewsDashboardFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as ReviewsDashboardSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter reviews dashboard…"
        value={query}
        onChange={handleQuery}
        data-testid={`${REVIEWS_DASHBOARD_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${REVIEWS_DASHBOARD_FEATURE.testId}-sort`}
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
