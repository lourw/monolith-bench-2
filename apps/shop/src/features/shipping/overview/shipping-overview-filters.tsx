import type { ChangeEvent } from 'react';
import { SHIPPING_OVERVIEW_FEATURE } from './shipping-overview.routes';
import type { ShippingOverviewSortKey } from './shipping-overview.utils';

export interface ShippingOverviewFiltersProps {
  query: string;
  sortKey: ShippingOverviewSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: ShippingOverviewSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: ShippingOverviewSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function ShippingOverviewFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: ShippingOverviewFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as ShippingOverviewSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter shipping overview…"
        value={query}
        onChange={handleQuery}
        data-testid={`${SHIPPING_OVERVIEW_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${SHIPPING_OVERVIEW_FEATURE.testId}-sort`}
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
