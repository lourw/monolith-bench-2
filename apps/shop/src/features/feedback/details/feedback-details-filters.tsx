import type { ChangeEvent } from 'react';
import { FEEDBACK_DETAILS_FEATURE } from './feedback-details.routes';
import type { FeedbackDetailsSortKey } from './feedback-details.utils';

export interface FeedbackDetailsFiltersProps {
  query: string;
  sortKey: FeedbackDetailsSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: FeedbackDetailsSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: FeedbackDetailsSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function FeedbackDetailsFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: FeedbackDetailsFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as FeedbackDetailsSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter feedback details…"
        value={query}
        onChange={handleQuery}
        data-testid={`${FEEDBACK_DETAILS_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${FEEDBACK_DETAILS_FEATURE.testId}-sort`}
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
