import type { ChangeEvent } from 'react';
import { CHECKOUT_WIZARD_FEATURE } from './checkout-wizard.routes';
import type { CheckoutWizardSortKey } from './checkout-wizard.utils';

export interface CheckoutWizardFiltersProps {
  query: string;
  sortKey: CheckoutWizardSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: CheckoutWizardSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: CheckoutWizardSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function CheckoutWizardFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: CheckoutWizardFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as CheckoutWizardSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter checkout wizard…"
        value={query}
        onChange={handleQuery}
        data-testid={`${CHECKOUT_WIZARD_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${CHECKOUT_WIZARD_FEATURE.testId}-sort`}
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
