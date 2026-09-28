import type { ChangeEvent } from 'react';
import { CHECKOUT_HISTORY_FEATURE } from './checkout-history.routes';
import type { CheckoutHistorySortKey } from './checkout-history.utils';

export interface CheckoutHistoryFiltersProps {
  query: string;
  sortKey: CheckoutHistorySortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: CheckoutHistorySortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: CheckoutHistorySortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function CheckoutHistoryFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: CheckoutHistoryFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as CheckoutHistorySortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter checkout history…"
        value={query}
        onChange={handleQuery}
        data-testid={`${CHECKOUT_HISTORY_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${CHECKOUT_HISTORY_FEATURE.testId}-sort`}
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
