import type { ChangeEvent } from 'react';
import { INVENTORY_WIZARD_FEATURE } from './inventory-wizard.routes';
import type { InventoryWizardSortKey } from './inventory-wizard.utils';

export interface InventoryWizardFiltersProps {
  query: string;
  sortKey: InventoryWizardSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: InventoryWizardSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: InventoryWizardSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function InventoryWizardFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: InventoryWizardFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as InventoryWizardSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter inventory wizard…"
        value={query}
        onChange={handleQuery}
        data-testid={`${INVENTORY_WIZARD_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${INVENTORY_WIZARD_FEATURE.testId}-sort`}
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
