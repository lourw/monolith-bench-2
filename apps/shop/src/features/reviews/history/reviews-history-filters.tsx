import type { ChangeEvent } from 'react';
import { REVIEWS_HISTORY_FEATURE } from './reviews-history.routes';
import type { ReviewsHistorySortKey } from './reviews-history.utils';

export interface ReviewsHistoryFiltersProps {
  query: string;
  sortKey: ReviewsHistorySortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: ReviewsHistorySortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: ReviewsHistorySortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function ReviewsHistoryFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: ReviewsHistoryFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as ReviewsHistorySortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter reviews history…"
        value={query}
        onChange={handleQuery}
        data-testid={`${REVIEWS_HISTORY_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${REVIEWS_HISTORY_FEATURE.testId}-sort`}
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
