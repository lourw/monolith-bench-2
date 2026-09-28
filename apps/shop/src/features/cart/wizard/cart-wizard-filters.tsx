import type { ChangeEvent } from 'react';
import { CART_WIZARD_FEATURE } from './cart-wizard.routes';
import type { CartWizardSortKey } from './cart-wizard.utils';

export interface CartWizardFiltersProps {
  query: string;
  sortKey: CartWizardSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: CartWizardSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{ value: CartWizardSortKey; label: string }> =
  [
    { value: 'name', label: 'Name' },
    { value: 'amount', label: 'Amount' },
    { value: 'quantity', label: 'Quantity' },
    { value: 'createdAt', label: 'Created' },
  ];

export function CartWizardFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: CartWizardFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as CartWizardSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter cart wizard…"
        value={query}
        onChange={handleQuery}
        data-testid={`${CART_WIZARD_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${CART_WIZARD_FEATURE.testId}-sort`}
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
