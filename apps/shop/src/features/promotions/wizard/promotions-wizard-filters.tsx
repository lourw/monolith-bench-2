import type { ChangeEvent } from 'react';
import { PROMOTIONS_WIZARD_FEATURE } from './promotions-wizard.routes';
import type { PromotionsWizardSortKey } from './promotions-wizard.utils';

export interface PromotionsWizardFiltersProps {
  query: string;
  sortKey: PromotionsWizardSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: PromotionsWizardSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: PromotionsWizardSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function PromotionsWizardFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: PromotionsWizardFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as PromotionsWizardSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter promotions wizard…"
        value={query}
        onChange={handleQuery}
        data-testid={`${PROMOTIONS_WIZARD_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${PROMOTIONS_WIZARD_FEATURE.testId}-sort`}
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
