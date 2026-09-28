import type { ChangeEvent } from 'react';
import { CATALOG_SETTINGS_FEATURE } from './catalog-settings.routes';
import type { CatalogSettingsSortKey } from './catalog-settings.utils';

export interface CatalogSettingsFiltersProps {
  query: string;
  sortKey: CatalogSettingsSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: CatalogSettingsSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: CatalogSettingsSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function CatalogSettingsFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: CatalogSettingsFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as CatalogSettingsSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter catalog settings…"
        value={query}
        onChange={handleQuery}
        data-testid={`${CATALOG_SETTINGS_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${CATALOG_SETTINGS_FEATURE.testId}-sort`}
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
