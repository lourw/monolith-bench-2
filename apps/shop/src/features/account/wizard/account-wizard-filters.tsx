import type { ChangeEvent } from 'react';
import { ACCOUNT_WIZARD_FEATURE } from './account-wizard.routes';
import type { AccountWizardSortKey } from './account-wizard.utils';

export interface AccountWizardFiltersProps {
  query: string;
  sortKey: AccountWizardSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: AccountWizardSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: AccountWizardSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function AccountWizardFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: AccountWizardFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as AccountWizardSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter account wizard…"
        value={query}
        onChange={handleQuery}
        data-testid={`${ACCOUNT_WIZARD_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${ACCOUNT_WIZARD_FEATURE.testId}-sort`}
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
