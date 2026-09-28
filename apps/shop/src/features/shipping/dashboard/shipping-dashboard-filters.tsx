import type { ChangeEvent } from 'react';
import { SHIPPING_DASHBOARD_FEATURE } from './shipping-dashboard.routes';
import type { ShippingDashboardSortKey } from './shipping-dashboard.utils';

export interface ShippingDashboardFiltersProps {
  query: string;
  sortKey: ShippingDashboardSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: ShippingDashboardSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: ShippingDashboardSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function ShippingDashboardFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: ShippingDashboardFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as ShippingDashboardSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter shipping dashboard…"
        value={query}
        onChange={handleQuery}
        data-testid={`${SHIPPING_DASHBOARD_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${SHIPPING_DASHBOARD_FEATURE.testId}-sort`}
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
