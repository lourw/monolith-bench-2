import type { ChangeEvent } from 'react';
import { TRACKING_WIZARD_FEATURE } from './tracking-wizard.routes';
import type { TrackingWizardSortKey } from './tracking-wizard.utils';

export interface TrackingWizardFiltersProps {
  query: string;
  sortKey: TrackingWizardSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: TrackingWizardSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: TrackingWizardSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function TrackingWizardFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: TrackingWizardFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as TrackingWizardSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter tracking wizard…"
        value={query}
        onChange={handleQuery}
        data-testid={`${TRACKING_WIZARD_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${TRACKING_WIZARD_FEATURE.testId}-sort`}
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
