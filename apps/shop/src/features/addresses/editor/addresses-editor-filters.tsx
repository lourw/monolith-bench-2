import type { ChangeEvent } from 'react';
import { ADDRESSES_EDITOR_FEATURE } from './addresses-editor.routes';
import type { AddressesEditorSortKey } from './addresses-editor.utils';

export interface AddressesEditorFiltersProps {
  query: string;
  sortKey: AddressesEditorSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: AddressesEditorSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: AddressesEditorSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function AddressesEditorFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: AddressesEditorFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as AddressesEditorSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter addresses editor…"
        value={query}
        onChange={handleQuery}
        data-testid={`${ADDRESSES_EDITOR_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${ADDRESSES_EDITOR_FEATURE.testId}-sort`}
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
