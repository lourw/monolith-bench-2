import type { ChangeEvent } from 'react';
import { NOTIFICATIONS_HISTORY_FEATURE } from './notifications-history.routes';
import type { NotificationsHistorySortKey } from './notifications-history.utils';

export interface NotificationsHistoryFiltersProps {
  query: string;
  sortKey: NotificationsHistorySortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: NotificationsHistorySortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: NotificationsHistorySortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function NotificationsHistoryFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: NotificationsHistoryFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as NotificationsHistorySortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter notifications history…"
        value={query}
        onChange={handleQuery}
        data-testid={`${NOTIFICATIONS_HISTORY_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${NOTIFICATIONS_HISTORY_FEATURE.testId}-sort`}
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
