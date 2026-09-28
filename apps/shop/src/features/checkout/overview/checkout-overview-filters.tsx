import type { ChangeEvent } from 'react';
import { CHECKOUT_OVERVIEW_FEATURE } from './checkout-overview.routes';
import type { CheckoutOverviewSortKey } from './checkout-overview.utils';

export interface CheckoutOverviewFiltersProps {
  query: string;
  sortKey: CheckoutOverviewSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: CheckoutOverviewSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: CheckoutOverviewSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function CheckoutOverviewFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: CheckoutOverviewFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as CheckoutOverviewSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter checkout overview…"
        value={query}
        onChange={handleQuery}
        data-testid={`${CHECKOUT_OVERVIEW_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${CHECKOUT_OVERVIEW_FEATURE.testId}-sort`}
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
