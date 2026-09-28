import type { ChangeEvent } from 'react';
import { REVIEWS_SUMMARY_FEATURE } from './reviews-summary.routes';
import type { ReviewsSummarySortKey } from './reviews-summary.utils';

export interface ReviewsSummaryFiltersProps {
  query: string;
  sortKey: ReviewsSummarySortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: ReviewsSummarySortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: ReviewsSummarySortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function ReviewsSummaryFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: ReviewsSummaryFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as ReviewsSummarySortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter reviews summary…"
        value={query}
        onChange={handleQuery}
        data-testid={`${REVIEWS_SUMMARY_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${REVIEWS_SUMMARY_FEATURE.testId}-sort`}
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
