import type { ChangeEvent } from 'react';
import { PREORDERS_WIZARD_FEATURE } from './preorders-wizard.routes';
import type { PreordersWizardSortKey } from './preorders-wizard.utils';

export interface PreordersWizardFiltersProps {
  query: string;
  sortKey: PreordersWizardSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: PreordersWizardSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: PreordersWizardSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function PreordersWizardFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: PreordersWizardFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as PreordersWizardSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter preorders wizard…"
        value={query}
        onChange={handleQuery}
        data-testid={`${PREORDERS_WIZARD_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${PREORDERS_WIZARD_FEATURE.testId}-sort`}
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
