import type { ChangeEvent } from 'react';
import { SHIPPING_DETAILS_FEATURE } from './shipping-details.routes';
import type { ShippingDetailsSortKey } from './shipping-details.utils';

export interface ShippingDetailsFiltersProps {
  query: string;
  sortKey: ShippingDetailsSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: ShippingDetailsSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: ShippingDetailsSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function ShippingDetailsFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: ShippingDetailsFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as ShippingDetailsSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter shipping details…"
        value={query}
        onChange={handleQuery}
        data-testid={`${SHIPPING_DETAILS_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${SHIPPING_DETAILS_FEATURE.testId}-sort`}
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
