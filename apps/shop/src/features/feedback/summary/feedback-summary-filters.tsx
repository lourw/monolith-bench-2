import type { ChangeEvent } from 'react';
import { FEEDBACK_SUMMARY_FEATURE } from './feedback-summary.routes';
import type { FeedbackSummarySortKey } from './feedback-summary.utils';

export interface FeedbackSummaryFiltersProps {
  query: string;
  sortKey: FeedbackSummarySortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: FeedbackSummarySortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: FeedbackSummarySortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function FeedbackSummaryFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: FeedbackSummaryFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as FeedbackSummarySortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter feedback summary…"
        value={query}
        onChange={handleQuery}
        data-testid={`${FEEDBACK_SUMMARY_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${FEEDBACK_SUMMARY_FEATURE.testId}-sort`}
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
