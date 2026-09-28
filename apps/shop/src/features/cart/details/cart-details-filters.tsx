import type { ChangeEvent } from 'react';
import { CART_DETAILS_FEATURE } from './cart-details.routes';
import type { CartDetailsSortKey } from './cart-details.utils';

export interface CartDetailsFiltersProps {
  query: string;
  sortKey: CartDetailsSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: CartDetailsSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: CartDetailsSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function CartDetailsFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: CartDetailsFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as CartDetailsSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter cart details…"
        value={query}
        onChange={handleQuery}
        data-testid={`${CART_DETAILS_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${CART_DETAILS_FEATURE.testId}-sort`}
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
