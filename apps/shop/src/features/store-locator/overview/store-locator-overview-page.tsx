import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { SubscriptionsInsightsSummary } from '../../subscriptions/insights/subscriptions-insights-summary';
import { StoreLocatorOverviewFilters } from './store-locator-overview-filters';
import { StoreLocatorOverviewHeader } from './store-locator-overview-header';
import { StoreLocatorOverviewPanel } from './store-locator-overview-panel';
import { StoreLocatorOverviewTable } from './store-locator-overview-table';
import { STORE_LOCATOR_OVERVIEW_FEATURE } from './store-locator-overview.routes';
import { useStoreLocatorOverview } from './use-store-locator-overview';

export function StoreLocatorOverviewPage() {
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
  } = useStoreLocatorOverview();

  return (
    <section
      className="feature-page"
      data-testid={STORE_LOCATOR_OVERVIEW_FEATURE.testId}
    >
      <StoreLocatorOverviewHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <StoreLocatorOverviewFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <StoreLocatorOverviewTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <StoreLocatorOverviewPanel
            selected={selected}
            onClear={() => select(null)}
          />
          <SubscriptionsInsightsSummary compact />
        </div>
      </div>
    </section>
  );
}

export default StoreLocatorOverviewPage;
