import type { ChangeEvent } from 'react';
import { FEEDBACK_OVERVIEW_FEATURE } from './feedback-overview.routes';
import type { FeedbackOverviewSortKey } from './feedback-overview.utils';

export interface FeedbackOverviewFiltersProps {
  query: string;
  sortKey: FeedbackOverviewSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: FeedbackOverviewSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: FeedbackOverviewSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function FeedbackOverviewFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: FeedbackOverviewFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as FeedbackOverviewSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter feedback overview…"
        value={query}
        onChange={handleQuery}
        data-testid={`${FEEDBACK_OVERVIEW_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${FEEDBACK_OVERVIEW_FEATURE.testId}-sort`}
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
