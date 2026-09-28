import type { ChangeEvent } from 'react';
import { FEEDBACK_LIST_FEATURE } from './feedback-list.routes';
import type { FeedbackListSortKey } from './feedback-list.utils';

export interface FeedbackListFiltersProps {
  query: string;
  sortKey: FeedbackListSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: FeedbackListSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: FeedbackListSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function FeedbackListFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: FeedbackListFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as FeedbackListSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter feedback list…"
        value={query}
        onChange={handleQuery}
        data-testid={`${FEEDBACK_LIST_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${FEEDBACK_LIST_FEATURE.testId}-sort`}
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
