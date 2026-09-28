import type { ChangeEvent } from 'react';
import { FEEDBACK_HISTORY_FEATURE } from './feedback-history.routes';
import type { FeedbackHistorySortKey } from './feedback-history.utils';

export interface FeedbackHistoryFiltersProps {
  query: string;
  sortKey: FeedbackHistorySortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: FeedbackHistorySortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: FeedbackHistorySortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function FeedbackHistoryFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: FeedbackHistoryFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as FeedbackHistorySortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter feedback history…"
        value={query}
        onChange={handleQuery}
        data-testid={`${FEEDBACK_HISTORY_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${FEEDBACK_HISTORY_FEATURE.testId}-sort`}
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
