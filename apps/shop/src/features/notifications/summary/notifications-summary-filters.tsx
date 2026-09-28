import type { ChangeEvent } from 'react';
import { NOTIFICATIONS_SUMMARY_FEATURE } from './notifications-summary.routes';
import type { NotificationsSummarySortKey } from './notifications-summary.utils';

export interface NotificationsSummaryFiltersProps {
  query: string;
  sortKey: NotificationsSummarySortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: NotificationsSummarySortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: NotificationsSummarySortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function NotificationsSummaryFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: NotificationsSummaryFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as NotificationsSummarySortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter notifications summary…"
        value={query}
        onChange={handleQuery}
        data-testid={`${NOTIFICATIONS_SUMMARY_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${NOTIFICATIONS_SUMMARY_FEATURE.testId}-sort`}
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
