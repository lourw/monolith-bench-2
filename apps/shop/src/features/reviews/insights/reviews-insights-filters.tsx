import type { ChangeEvent } from 'react';
import { REVIEWS_INSIGHTS_FEATURE } from './reviews-insights.routes';
import type { ReviewsInsightsSortKey } from './reviews-insights.utils';

export interface ReviewsInsightsFiltersProps {
  query: string;
  sortKey: ReviewsInsightsSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: ReviewsInsightsSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: ReviewsInsightsSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function ReviewsInsightsFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: ReviewsInsightsFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as ReviewsInsightsSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter reviews insights…"
        value={query}
        onChange={handleQuery}
        data-testid={`${REVIEWS_INSIGHTS_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${REVIEWS_INSIGHTS_FEATURE.testId}-sort`}
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
