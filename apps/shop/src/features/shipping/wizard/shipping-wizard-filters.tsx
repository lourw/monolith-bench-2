import type { ChangeEvent } from 'react';
import { SHIPPING_WIZARD_FEATURE } from './shipping-wizard.routes';
import type { ShippingWizardSortKey } from './shipping-wizard.utils';

export interface ShippingWizardFiltersProps {
  query: string;
  sortKey: ShippingWizardSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: ShippingWizardSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: ShippingWizardSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function ShippingWizardFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: ShippingWizardFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as ShippingWizardSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter shipping wizard…"
        value={query}
        onChange={handleQuery}
        data-testid={`${SHIPPING_WIZARD_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${SHIPPING_WIZARD_FEATURE.testId}-sort`}
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
