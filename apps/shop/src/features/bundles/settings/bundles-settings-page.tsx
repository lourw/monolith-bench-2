import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { BundlesSettingsFilters } from './bundles-settings-filters';
import { BundlesSettingsHeader } from './bundles-settings-header';
import { BundlesSettingsPanel } from './bundles-settings-panel';
import { BundlesSettingsTable } from './bundles-settings-table';
import { BUNDLES_SETTINGS_FEATURE } from './bundles-settings.routes';
import { useBundlesSettings } from './use-bundles-settings';

export function BundlesSettingsPage() {
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
  } = useBundlesSettings();

  return (
    <section
      className="feature-page"
      data-testid={BUNDLES_SETTINGS_FEATURE.testId}
    >
      <BundlesSettingsHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <BundlesSettingsFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <BundlesSettingsTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <BundlesSettingsPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default BundlesSettingsPage;
