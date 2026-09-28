import type { ChangeEvent } from 'react';
import { SHIPPING_SUMMARY_FEATURE } from './shipping-summary.routes';
import type { ShippingSummarySortKey } from './shipping-summary.utils';

export interface ShippingSummaryFiltersProps {
  query: string;
  sortKey: ShippingSummarySortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: ShippingSummarySortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: ShippingSummarySortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function ShippingSummaryFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: ShippingSummaryFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as ShippingSummarySortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter shipping summary…"
        value={query}
        onChange={handleQuery}
        data-testid={`${SHIPPING_SUMMARY_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${SHIPPING_SUMMARY_FEATURE.testId}-sort`}
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
