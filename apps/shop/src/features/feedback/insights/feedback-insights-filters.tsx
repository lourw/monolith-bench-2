import type { ChangeEvent } from 'react';
import { FEEDBACK_INSIGHTS_FEATURE } from './feedback-insights.routes';
import type { FeedbackInsightsSortKey } from './feedback-insights.utils';

export interface FeedbackInsightsFiltersProps {
  query: string;
  sortKey: FeedbackInsightsSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: FeedbackInsightsSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: FeedbackInsightsSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function FeedbackInsightsFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: FeedbackInsightsFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as FeedbackInsightsSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter feedback insights…"
        value={query}
        onChange={handleQuery}
        data-testid={`${FEEDBACK_INSIGHTS_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${FEEDBACK_INSIGHTS_FEATURE.testId}-sort`}
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
