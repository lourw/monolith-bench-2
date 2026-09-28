import type { ChangeEvent } from 'react';
import { BUNDLES_WIZARD_FEATURE } from './bundles-wizard.routes';
import type { BundlesWizardSortKey } from './bundles-wizard.utils';

export interface BundlesWizardFiltersProps {
  query: string;
  sortKey: BundlesWizardSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: BundlesWizardSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: BundlesWizardSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function BundlesWizardFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: BundlesWizardFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as BundlesWizardSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter bundles wizard…"
        value={query}
        onChange={handleQuery}
        data-testid={`${BUNDLES_WIZARD_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${BUNDLES_WIZARD_FEATURE.testId}-sort`}
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
