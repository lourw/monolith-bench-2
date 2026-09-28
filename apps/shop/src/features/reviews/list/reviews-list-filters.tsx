import type { ChangeEvent } from 'react';
import { REVIEWS_LIST_FEATURE } from './reviews-list.routes';
import type { ReviewsListSortKey } from './reviews-list.utils';

export interface ReviewsListFiltersProps {
  query: string;
  sortKey: ReviewsListSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: ReviewsListSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: ReviewsListSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function ReviewsListFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: ReviewsListFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as ReviewsListSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter reviews list…"
        value={query}
        onChange={handleQuery}
        data-testid={`${REVIEWS_LIST_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${REVIEWS_LIST_FEATURE.testId}-sort`}
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
