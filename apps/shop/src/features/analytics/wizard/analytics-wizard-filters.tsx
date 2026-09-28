import type { ChangeEvent } from 'react';
import { ANALYTICS_WIZARD_FEATURE } from './analytics-wizard.routes';
import type { AnalyticsWizardSortKey } from './analytics-wizard.utils';

export interface AnalyticsWizardFiltersProps {
  query: string;
  sortKey: AnalyticsWizardSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: AnalyticsWizardSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: AnalyticsWizardSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function AnalyticsWizardFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: AnalyticsWizardFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as AnalyticsWizardSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter analytics wizard…"
        value={query}
        onChange={handleQuery}
        data-testid={`${ANALYTICS_WIZARD_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${ANALYTICS_WIZARD_FEATURE.testId}-sort`}
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
