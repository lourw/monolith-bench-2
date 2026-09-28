import type { ChangeEvent } from 'react';
import { SUPPORT_WIZARD_FEATURE } from './support-wizard.routes';
import type { SupportWizardSortKey } from './support-wizard.utils';

export interface SupportWizardFiltersProps {
  query: string;
  sortKey: SupportWizardSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: SupportWizardSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: SupportWizardSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function SupportWizardFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: SupportWizardFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as SupportWizardSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter support wizard…"
        value={query}
        onChange={handleQuery}
        data-testid={`${SUPPORT_WIZARD_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${SUPPORT_WIZARD_FEATURE.testId}-sort`}
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
