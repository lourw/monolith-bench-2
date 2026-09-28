import type { ChangeEvent } from 'react';
import { NOTIFICATIONS_INSIGHTS_FEATURE } from './notifications-insights.routes';
import type { NotificationsInsightsSortKey } from './notifications-insights.utils';

export interface NotificationsInsightsFiltersProps {
  query: string;
  sortKey: NotificationsInsightsSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: NotificationsInsightsSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: NotificationsInsightsSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function NotificationsInsightsFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: NotificationsInsightsFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as NotificationsInsightsSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter notifications insights…"
        value={query}
        onChange={handleQuery}
        data-testid={`${NOTIFICATIONS_INSIGHTS_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${NOTIFICATIONS_INSIGHTS_FEATURE.testId}-sort`}
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
