import type { ChangeEvent } from 'react';
import { SUBSCRIPTIONS_DETAILS_FEATURE } from './subscriptions-details.routes';
import type { SubscriptionsDetailsSortKey } from './subscriptions-details.utils';

export interface SubscriptionsDetailsFiltersProps {
  query: string;
  sortKey: SubscriptionsDetailsSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: SubscriptionsDetailsSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: SubscriptionsDetailsSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function SubscriptionsDetailsFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: SubscriptionsDetailsFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as SubscriptionsDetailsSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter subscriptions details…"
        value={query}
        onChange={handleQuery}
        data-testid={`${SUBSCRIPTIONS_DETAILS_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${SUBSCRIPTIONS_DETAILS_FEATURE.testId}-sort`}
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
