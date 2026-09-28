import type { ChangeEvent } from 'react';
import { CHECKOUT_LIST_FEATURE } from './checkout-list.routes';
import type { CheckoutListSortKey } from './checkout-list.utils';

export interface CheckoutListFiltersProps {
  query: string;
  sortKey: CheckoutListSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: CheckoutListSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: CheckoutListSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function CheckoutListFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: CheckoutListFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as CheckoutListSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter checkout list…"
        value={query}
        onChange={handleQuery}
        data-testid={`${CHECKOUT_LIST_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${CHECKOUT_LIST_FEATURE.testId}-sort`}
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
