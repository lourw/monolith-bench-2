import type { ChangeEvent } from 'react';
import { SUBSCRIPTIONS_DASHBOARD_FEATURE } from './subscriptions-dashboard.routes';
import type { SubscriptionsDashboardSortKey } from './subscriptions-dashboard.utils';

export interface SubscriptionsDashboardFiltersProps {
  query: string;
  sortKey: SubscriptionsDashboardSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: SubscriptionsDashboardSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: SubscriptionsDashboardSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function SubscriptionsDashboardFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: SubscriptionsDashboardFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as SubscriptionsDashboardSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter subscriptions dashboard…"
        value={query}
        onChange={handleQuery}
        data-testid={`${SUBSCRIPTIONS_DASHBOARD_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${SUBSCRIPTIONS_DASHBOARD_FEATURE.testId}-sort`}
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
