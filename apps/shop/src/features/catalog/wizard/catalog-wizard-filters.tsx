import type { ChangeEvent } from 'react';
import { CATALOG_WIZARD_FEATURE } from './catalog-wizard.routes';
import type { CatalogWizardSortKey } from './catalog-wizard.utils';

export interface CatalogWizardFiltersProps {
  query: string;
  sortKey: CatalogWizardSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: CatalogWizardSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: CatalogWizardSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function CatalogWizardFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: CatalogWizardFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as CatalogWizardSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter catalog wizard…"
        value={query}
        onChange={handleQuery}
        data-testid={`${CATALOG_WIZARD_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${CATALOG_WIZARD_FEATURE.testId}-sort`}
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
