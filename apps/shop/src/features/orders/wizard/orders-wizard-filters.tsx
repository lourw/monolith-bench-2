import type { ChangeEvent } from 'react';
import { ORDERS_WIZARD_FEATURE } from './orders-wizard.routes';
import type { OrdersWizardSortKey } from './orders-wizard.utils';

export interface OrdersWizardFiltersProps {
  query: string;
  sortKey: OrdersWizardSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: OrdersWizardSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: OrdersWizardSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function OrdersWizardFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: OrdersWizardFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as OrdersWizardSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter orders wizard…"
        value={query}
        onChange={handleQuery}
        data-testid={`${ORDERS_WIZARD_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${ORDERS_WIZARD_FEATURE.testId}-sort`}
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
