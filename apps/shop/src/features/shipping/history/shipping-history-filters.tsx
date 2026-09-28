import type { ChangeEvent } from 'react';
import { SHIPPING_HISTORY_FEATURE } from './shipping-history.routes';
import type { ShippingHistorySortKey } from './shipping-history.utils';

export interface ShippingHistoryFiltersProps {
  query: string;
  sortKey: ShippingHistorySortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: ShippingHistorySortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: ShippingHistorySortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function ShippingHistoryFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: ShippingHistoryFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as ShippingHistorySortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter shipping history…"
        value={query}
        onChange={handleQuery}
        data-testid={`${SHIPPING_HISTORY_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${SHIPPING_HISTORY_FEATURE.testId}-sort`}
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
