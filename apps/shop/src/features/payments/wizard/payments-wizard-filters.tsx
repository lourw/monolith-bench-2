import type { ChangeEvent } from 'react';
import { PAYMENTS_WIZARD_FEATURE } from './payments-wizard.routes';
import type { PaymentsWizardSortKey } from './payments-wizard.utils';

export interface PaymentsWizardFiltersProps {
  query: string;
  sortKey: PaymentsWizardSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: PaymentsWizardSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: PaymentsWizardSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function PaymentsWizardFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: PaymentsWizardFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as PaymentsWizardSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter payments wizard…"
        value={query}
        onChange={handleQuery}
        data-testid={`${PAYMENTS_WIZARD_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${PAYMENTS_WIZARD_FEATURE.testId}-sort`}
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
