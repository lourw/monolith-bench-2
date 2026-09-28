import type { ChangeEvent } from 'react';
import { PROFILE_WIZARD_FEATURE } from './profile-wizard.routes';
import type { ProfileWizardSortKey } from './profile-wizard.utils';

export interface ProfileWizardFiltersProps {
  query: string;
  sortKey: ProfileWizardSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: ProfileWizardSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: ProfileWizardSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function ProfileWizardFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: ProfileWizardFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as ProfileWizardSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter profile wizard…"
        value={query}
        onChange={handleQuery}
        data-testid={`${PROFILE_WIZARD_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${PROFILE_WIZARD_FEATURE.testId}-sort`}
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
