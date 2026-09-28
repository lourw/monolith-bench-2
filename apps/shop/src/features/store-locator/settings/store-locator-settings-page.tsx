import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { ReviewsHistorySummary } from '../../reviews/history/reviews-history-summary';
import { StoreLocatorSettingsFilters } from './store-locator-settings-filters';
import { StoreLocatorSettingsHeader } from './store-locator-settings-header';
import { StoreLocatorSettingsPanel } from './store-locator-settings-panel';
import { StoreLocatorSettingsTable } from './store-locator-settings-table';
import { STORE_LOCATOR_SETTINGS_FEATURE } from './store-locator-settings.routes';
import { useStoreLocatorSettings } from './use-store-locator-settings';

export function StoreLocatorSettingsPage() {
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
  } = useStoreLocatorSettings();

  return (
    <section
      className="feature-page"
      data-testid={STORE_LOCATOR_SETTINGS_FEATURE.testId}
    >
      <StoreLocatorSettingsHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <StoreLocatorSettingsFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <StoreLocatorSettingsTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <StoreLocatorSettingsPanel
            selected={selected}
            onClear={() => select(null)}
          />
          <ReviewsHistorySummary compact />
        </div>
      </div>
    </section>
  );
}

export default StoreLocatorSettingsPage;
