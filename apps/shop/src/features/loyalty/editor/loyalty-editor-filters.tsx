import type { ChangeEvent } from 'react';
import { LOYALTY_EDITOR_FEATURE } from './loyalty-editor.routes';
import type { LoyaltyEditorSortKey } from './loyalty-editor.utils';

export interface LoyaltyEditorFiltersProps {
  query: string;
  sortKey: LoyaltyEditorSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: LoyaltyEditorSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: LoyaltyEditorSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function LoyaltyEditorFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: LoyaltyEditorFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as LoyaltyEditorSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter loyalty editor…"
        value={query}
        onChange={handleQuery}
        data-testid={`${LOYALTY_EDITOR_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${LOYALTY_EDITOR_FEATURE.testId}-sort`}
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
