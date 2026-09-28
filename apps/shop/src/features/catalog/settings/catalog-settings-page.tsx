import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { CatalogSettingsFilters } from './catalog-settings-filters';
import { CatalogSettingsHeader } from './catalog-settings-header';
import { CatalogSettingsPanel } from './catalog-settings-panel';
import { CatalogSettingsTable } from './catalog-settings-table';
import { CATALOG_SETTINGS_FEATURE } from './catalog-settings.routes';
import { useCatalogSettings } from './use-catalog-settings';

export function CatalogSettingsPage() {
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
  } = useCatalogSettings();

  return (
    <section
      className="feature-page"
      data-testid={CATALOG_SETTINGS_FEATURE.testId}
    >
      <CatalogSettingsHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <CatalogSettingsFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <CatalogSettingsTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <CatalogSettingsPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default CatalogSettingsPage;
