import type { ChangeEvent } from 'react';
import { RECOMMENDATIONS_WIZARD_FEATURE } from './recommendations-wizard.routes';
import type { RecommendationsWizardSortKey } from './recommendations-wizard.utils';

export interface RecommendationsWizardFiltersProps {
  query: string;
  sortKey: RecommendationsWizardSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: RecommendationsWizardSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: RecommendationsWizardSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function RecommendationsWizardFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: RecommendationsWizardFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as RecommendationsWizardSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter recommendations wizard…"
        value={query}
        onChange={handleQuery}
        data-testid={`${RECOMMENDATIONS_WIZARD_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${RECOMMENDATIONS_WIZARD_FEATURE.testId}-sort`}
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
