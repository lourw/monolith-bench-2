import type { ChangeEvent } from 'react';
import { FEEDBACK_DASHBOARD_FEATURE } from './feedback-dashboard.routes';
import type { FeedbackDashboardSortKey } from './feedback-dashboard.utils';

export interface FeedbackDashboardFiltersProps {
  query: string;
  sortKey: FeedbackDashboardSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: FeedbackDashboardSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: FeedbackDashboardSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function FeedbackDashboardFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: FeedbackDashboardFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as FeedbackDashboardSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter feedback dashboard…"
        value={query}
        onChange={handleQuery}
        data-testid={`${FEEDBACK_DASHBOARD_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${FEEDBACK_DASHBOARD_FEATURE.testId}-sort`}
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
