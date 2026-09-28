import type { ChangeEvent } from 'react';
import { CHECKOUT_DETAILS_FEATURE } from './checkout-details.routes';
import type { CheckoutDetailsSortKey } from './checkout-details.utils';

export interface CheckoutDetailsFiltersProps {
  query: string;
  sortKey: CheckoutDetailsSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: CheckoutDetailsSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: CheckoutDetailsSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function CheckoutDetailsFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: CheckoutDetailsFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as CheckoutDetailsSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter checkout details…"
        value={query}
        onChange={handleQuery}
        data-testid={`${CHECKOUT_DETAILS_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${CHECKOUT_DETAILS_FEATURE.testId}-sort`}
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
