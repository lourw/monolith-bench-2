import type { ChangeEvent } from 'react';
import { SHIPPING_LIST_FEATURE } from './shipping-list.routes';
import type { ShippingListSortKey } from './shipping-list.utils';

export interface ShippingListFiltersProps {
  query: string;
  sortKey: ShippingListSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: ShippingListSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: ShippingListSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function ShippingListFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: ShippingListFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as ShippingListSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter shipping list…"
        value={query}
        onChange={handleQuery}
        data-testid={`${SHIPPING_LIST_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${SHIPPING_LIST_FEATURE.testId}-sort`}
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
