import type { ChangeEvent } from 'react';
import { REVIEWS_OVERVIEW_FEATURE } from './reviews-overview.routes';
import type { ReviewsOverviewSortKey } from './reviews-overview.utils';

export interface ReviewsOverviewFiltersProps {
  query: string;
  sortKey: ReviewsOverviewSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: ReviewsOverviewSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: ReviewsOverviewSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function ReviewsOverviewFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: ReviewsOverviewFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as ReviewsOverviewSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter reviews overview…"
        value={query}
        onChange={handleQuery}
        data-testid={`${REVIEWS_OVERVIEW_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${REVIEWS_OVERVIEW_FEATURE.testId}-sort`}
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
