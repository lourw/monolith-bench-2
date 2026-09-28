import type { ChangeEvent } from 'react';
import { PAYMENTS_EDITOR_FEATURE } from './payments-editor.routes';
import type { PaymentsEditorSortKey } from './payments-editor.utils';

export interface PaymentsEditorFiltersProps {
  query: string;
  sortKey: PaymentsEditorSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: PaymentsEditorSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: PaymentsEditorSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function PaymentsEditorFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: PaymentsEditorFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as PaymentsEditorSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter payments editor…"
        value={query}
        onChange={handleQuery}
        data-testid={`${PAYMENTS_EDITOR_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${PAYMENTS_EDITOR_FEATURE.testId}-sort`}
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
