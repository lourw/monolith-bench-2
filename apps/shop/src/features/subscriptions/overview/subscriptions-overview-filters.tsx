import type { ChangeEvent } from 'react';
import { SUBSCRIPTIONS_OVERVIEW_FEATURE } from './subscriptions-overview.routes';
import type { SubscriptionsOverviewSortKey } from './subscriptions-overview.utils';

export interface SubscriptionsOverviewFiltersProps {
  query: string;
  sortKey: SubscriptionsOverviewSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: SubscriptionsOverviewSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: SubscriptionsOverviewSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function SubscriptionsOverviewFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: SubscriptionsOverviewFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as SubscriptionsOverviewSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter subscriptions overview…"
        value={query}
        onChange={handleQuery}
        data-testid={`${SUBSCRIPTIONS_OVERVIEW_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${SUBSCRIPTIONS_OVERVIEW_FEATURE.testId}-sort`}
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
