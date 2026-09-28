import type { ChangeEvent } from 'react';
import { LOYALTY_WIZARD_FEATURE } from './loyalty-wizard.routes';
import type { LoyaltyWizardSortKey } from './loyalty-wizard.utils';

export interface LoyaltyWizardFiltersProps {
  query: string;
  sortKey: LoyaltyWizardSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: LoyaltyWizardSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: LoyaltyWizardSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function LoyaltyWizardFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: LoyaltyWizardFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as LoyaltyWizardSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter loyalty wizard…"
        value={query}
        onChange={handleQuery}
        data-testid={`${LOYALTY_WIZARD_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${LOYALTY_WIZARD_FEATURE.testId}-sort`}
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
