import type { ChangeEvent } from 'react';
import { STORE_LOCATOR_WIZARD_FEATURE } from './store-locator-wizard.routes';
import type { StoreLocatorWizardSortKey } from './store-locator-wizard.utils';

export interface StoreLocatorWizardFiltersProps {
  query: string;
  sortKey: StoreLocatorWizardSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: StoreLocatorWizardSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: StoreLocatorWizardSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function StoreLocatorWizardFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: StoreLocatorWizardFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as StoreLocatorWizardSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter store locator wizard…"
        value={query}
        onChange={handleQuery}
        data-testid={`${STORE_LOCATOR_WIZARD_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${STORE_LOCATOR_WIZARD_FEATURE.testId}-sort`}
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
