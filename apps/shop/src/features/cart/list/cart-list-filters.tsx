import type { ChangeEvent } from 'react';
import { CART_LIST_FEATURE } from './cart-list.routes';
import type { CartListSortKey } from './cart-list.utils';

export interface CartListFiltersProps {
  query: string;
  sortKey: CartListSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: CartListSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{ value: CartListSortKey; label: string }> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function CartListFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: CartListFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as CartListSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter cart list…"
        value={query}
        onChange={handleQuery}
        data-testid={`${CART_LIST_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${CART_LIST_FEATURE.testId}-sort`}
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
