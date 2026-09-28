import type { ChangeEvent } from 'react';
import { ADDRESSES_WIZARD_FEATURE } from './addresses-wizard.routes';
import type { AddressesWizardSortKey } from './addresses-wizard.utils';

export interface AddressesWizardFiltersProps {
  query: string;
  sortKey: AddressesWizardSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: AddressesWizardSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: AddressesWizardSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function AddressesWizardFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: AddressesWizardFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as AddressesWizardSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter addresses wizard…"
        value={query}
        onChange={handleQuery}
        data-testid={`${ADDRESSES_WIZARD_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${ADDRESSES_WIZARD_FEATURE.testId}-sort`}
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
