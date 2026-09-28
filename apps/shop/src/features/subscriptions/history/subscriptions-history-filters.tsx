import type { ChangeEvent } from 'react';
import { SUBSCRIPTIONS_HISTORY_FEATURE } from './subscriptions-history.routes';
import type { SubscriptionsHistorySortKey } from './subscriptions-history.utils';

export interface SubscriptionsHistoryFiltersProps {
  query: string;
  sortKey: SubscriptionsHistorySortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: SubscriptionsHistorySortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: SubscriptionsHistorySortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function SubscriptionsHistoryFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: SubscriptionsHistoryFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as SubscriptionsHistorySortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter subscriptions history…"
        value={query}
        onChange={handleQuery}
        data-testid={`${SUBSCRIPTIONS_HISTORY_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${SUBSCRIPTIONS_HISTORY_FEATURE.testId}-sort`}
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
