import type { ChangeEvent } from 'react';
import { CART_OVERVIEW_FEATURE } from './cart-overview.routes';
import type { CartOverviewSortKey } from './cart-overview.utils';

export interface CartOverviewFiltersProps {
  query: string;
  sortKey: CartOverviewSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: CartOverviewSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: CartOverviewSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function CartOverviewFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: CartOverviewFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as CartOverviewSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter cart overview…"
        value={query}
        onChange={handleQuery}
        data-testid={`${CART_OVERVIEW_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${CART_OVERVIEW_FEATURE.testId}-sort`}
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
