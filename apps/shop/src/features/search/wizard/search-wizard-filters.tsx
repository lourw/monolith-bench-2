import type { ChangeEvent } from 'react';
import { SEARCH_WIZARD_FEATURE } from './search-wizard.routes';
import type { SearchWizardSortKey } from './search-wizard.utils';

export interface SearchWizardFiltersProps {
  query: string;
  sortKey: SearchWizardSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: SearchWizardSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: SearchWizardSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function SearchWizardFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: SearchWizardFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as SearchWizardSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter search wizard…"
        value={query}
        onChange={handleQuery}
        data-testid={`${SEARCH_WIZARD_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${SEARCH_WIZARD_FEATURE.testId}-sort`}
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
