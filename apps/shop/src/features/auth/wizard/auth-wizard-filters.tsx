import type { ChangeEvent } from 'react';
import { AUTH_WIZARD_FEATURE } from './auth-wizard.routes';
import type { AuthWizardSortKey } from './auth-wizard.utils';

export interface AuthWizardFiltersProps {
  query: string;
  sortKey: AuthWizardSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: AuthWizardSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{ value: AuthWizardSortKey; label: string }> =
  [
    { value: 'name', label: 'Name' },
    { value: 'amount', label: 'Amount' },
    { value: 'quantity', label: 'Quantity' },
    { value: 'createdAt', label: 'Created' },
  ];

export function AuthWizardFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: AuthWizardFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as AuthWizardSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter auth wizard…"
        value={query}
        onChange={handleQuery}
        data-testid={`${AUTH_WIZARD_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${AUTH_WIZARD_FEATURE.testId}-sort`}
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
