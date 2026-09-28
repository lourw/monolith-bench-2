import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { StoreLocatorInsightsFilters } from './store-locator-insights-filters';
import { StoreLocatorInsightsHeader } from './store-locator-insights-header';
import { StoreLocatorInsightsPanel } from './store-locator-insights-panel';
import { StoreLocatorInsightsTable } from './store-locator-insights-table';
import { STORE_LOCATOR_INSIGHTS_FEATURE } from './store-locator-insights.routes';
import { useStoreLocatorInsights } from './use-store-locator-insights';

export function StoreLocatorInsightsPage() {
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
  } = useStoreLocatorInsights();

  return (
    <section
      className="feature-page"
      data-testid={STORE_LOCATOR_INSIGHTS_FEATURE.testId}
    >
      <StoreLocatorInsightsHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <StoreLocatorInsightsFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <StoreLocatorInsightsTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <StoreLocatorInsightsPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default StoreLocatorInsightsPage;
