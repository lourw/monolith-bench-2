import type { ChangeEvent } from 'react';
import { REVIEWS_DETAILS_FEATURE } from './reviews-details.routes';
import type { ReviewsDetailsSortKey } from './reviews-details.utils';

export interface ReviewsDetailsFiltersProps {
  query: string;
  sortKey: ReviewsDetailsSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: ReviewsDetailsSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: ReviewsDetailsSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function ReviewsDetailsFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: ReviewsDetailsFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as ReviewsDetailsSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter reviews details…"
        value={query}
        onChange={handleQuery}
        data-testid={`${REVIEWS_DETAILS_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${REVIEWS_DETAILS_FEATURE.testId}-sort`}
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
