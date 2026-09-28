import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { InventorySettingsFilters } from './inventory-settings-filters';
import { InventorySettingsHeader } from './inventory-settings-header';
import { InventorySettingsPanel } from './inventory-settings-panel';
import { InventorySettingsTable } from './inventory-settings-table';
import { INVENTORY_SETTINGS_FEATURE } from './inventory-settings.routes';
import { useInventorySettings } from './use-inventory-settings';

export function InventorySettingsPage() {
  const {
    items,
    selected,
    query,
    sortKey,
    loading,
    error,
    totals,
    select,
    setQuery,
    setSortKey,
    refresh,
  } = useInventorySettings();

  return (
    <section
      className="feature-page"
      data-testid={INVENTORY_SETTINGS_FEATURE.testId}
    >
      <InventorySettingsHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <InventorySettingsFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <InventorySettingsTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <InventorySettingsPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default InventorySettingsPage;
