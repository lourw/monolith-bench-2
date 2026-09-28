import type { ChangeEvent } from 'react';
import { SUBSCRIPTIONS_LIST_FEATURE } from './subscriptions-list.routes';
import type { SubscriptionsListSortKey } from './subscriptions-list.utils';

export interface SubscriptionsListFiltersProps {
  query: string;
  sortKey: SubscriptionsListSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: SubscriptionsListSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: SubscriptionsListSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function SubscriptionsListFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: SubscriptionsListFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as SubscriptionsListSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter subscriptions list…"
        value={query}
        onChange={handleQuery}
        data-testid={`${SUBSCRIPTIONS_LIST_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${SUBSCRIPTIONS_LIST_FEATURE.testId}-sort`}
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
