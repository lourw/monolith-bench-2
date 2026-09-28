import type { ChangeEvent } from 'react';
import { PAYMENTS_DASHBOARD_FEATURE } from './payments-dashboard.routes';
import type { PaymentsDashboardSortKey } from './payments-dashboard.utils';

export interface PaymentsDashboardFiltersProps {
  query: string;
  sortKey: PaymentsDashboardSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: PaymentsDashboardSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: PaymentsDashboardSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function PaymentsDashboardFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: PaymentsDashboardFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as PaymentsDashboardSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter payments dashboard…"
        value={query}
        onChange={handleQuery}
        data-testid={`${PAYMENTS_DASHBOARD_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${PAYMENTS_DASHBOARD_FEATURE.testId}-sort`}
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
