import type { ChangeEvent } from 'react';
import { RETURNS_WIZARD_FEATURE } from './returns-wizard.routes';
import type { ReturnsWizardSortKey } from './returns-wizard.utils';

export interface ReturnsWizardFiltersProps {
  query: string;
  sortKey: ReturnsWizardSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: ReturnsWizardSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: ReturnsWizardSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function ReturnsWizardFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: ReturnsWizardFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as ReturnsWizardSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter returns wizard…"
        value={query}
        onChange={handleQuery}
        data-testid={`${RETURNS_WIZARD_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${RETURNS_WIZARD_FEATURE.testId}-sort`}
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
