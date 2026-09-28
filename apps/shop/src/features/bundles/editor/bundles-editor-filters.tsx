import type { ChangeEvent } from 'react';
import { BUNDLES_EDITOR_FEATURE } from './bundles-editor.routes';
import type { BundlesEditorSortKey } from './bundles-editor.utils';

export interface BundlesEditorFiltersProps {
  query: string;
  sortKey: BundlesEditorSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: BundlesEditorSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: BundlesEditorSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function BundlesEditorFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: BundlesEditorFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as BundlesEditorSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter bundles editor…"
        value={query}
        onChange={handleQuery}
        data-testid={`${BUNDLES_EDITOR_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${BUNDLES_EDITOR_FEATURE.testId}-sort`}
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
