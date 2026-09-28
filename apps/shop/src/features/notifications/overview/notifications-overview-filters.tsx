import type { ChangeEvent } from 'react';
import { NOTIFICATIONS_OVERVIEW_FEATURE } from './notifications-overview.routes';
import type { NotificationsOverviewSortKey } from './notifications-overview.utils';

export interface NotificationsOverviewFiltersProps {
  query: string;
  sortKey: NotificationsOverviewSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: NotificationsOverviewSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: NotificationsOverviewSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function NotificationsOverviewFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: NotificationsOverviewFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as NotificationsOverviewSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter notifications overview…"
        value={query}
        onChange={handleQuery}
        data-testid={`${NOTIFICATIONS_OVERVIEW_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${NOTIFICATIONS_OVERVIEW_FEATURE.testId}-sort`}
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
