import type { ChangeEvent } from 'react';
import { CART_HISTORY_FEATURE } from './cart-history.routes';
import type { CartHistorySortKey } from './cart-history.utils';

export interface CartHistoryFiltersProps {
  query: string;
  sortKey: CartHistorySortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: CartHistorySortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: CartHistorySortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function CartHistoryFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: CartHistoryFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as CartHistorySortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter cart history…"
        value={query}
        onChange={handleQuery}
        data-testid={`${CART_HISTORY_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${CART_HISTORY_FEATURE.testId}-sort`}
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
