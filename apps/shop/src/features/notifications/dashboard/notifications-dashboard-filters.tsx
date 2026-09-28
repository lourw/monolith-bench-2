import type { ChangeEvent } from 'react';
import { NOTIFICATIONS_DASHBOARD_FEATURE } from './notifications-dashboard.routes';
import type { NotificationsDashboardSortKey } from './notifications-dashboard.utils';

export interface NotificationsDashboardFiltersProps {
  query: string;
  sortKey: NotificationsDashboardSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: NotificationsDashboardSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: NotificationsDashboardSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function NotificationsDashboardFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: NotificationsDashboardFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as NotificationsDashboardSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter notifications dashboard…"
        value={query}
        onChange={handleQuery}
        data-testid={`${NOTIFICATIONS_DASHBOARD_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${NOTIFICATIONS_DASHBOARD_FEATURE.testId}-sort`}
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
