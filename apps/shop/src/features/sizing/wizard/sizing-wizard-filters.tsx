import type { ChangeEvent } from 'react';
import { SIZING_WIZARD_FEATURE } from './sizing-wizard.routes';
import type { SizingWizardSortKey } from './sizing-wizard.utils';

export interface SizingWizardFiltersProps {
  query: string;
  sortKey: SizingWizardSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: SizingWizardSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: SizingWizardSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function SizingWizardFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: SizingWizardFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as SizingWizardSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter sizing wizard…"
        value={query}
        onChange={handleQuery}
        data-testid={`${SIZING_WIZARD_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${SIZING_WIZARD_FEATURE.testId}-sort`}
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
