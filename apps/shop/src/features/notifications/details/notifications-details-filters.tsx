import type { ChangeEvent } from 'react';
import { NOTIFICATIONS_DETAILS_FEATURE } from './notifications-details.routes';
import type { NotificationsDetailsSortKey } from './notifications-details.utils';

export interface NotificationsDetailsFiltersProps {
  query: string;
  sortKey: NotificationsDetailsSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: NotificationsDetailsSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: NotificationsDetailsSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function NotificationsDetailsFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: NotificationsDetailsFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as NotificationsDetailsSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter notifications details…"
        value={query}
        onChange={handleQuery}
        data-testid={`${NOTIFICATIONS_DETAILS_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${NOTIFICATIONS_DETAILS_FEATURE.testId}-sort`}
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
