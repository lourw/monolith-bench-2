import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { StoreLocatorSummaryFilters } from './store-locator-summary-filters';
import { StoreLocatorSummaryHeader } from './store-locator-summary-header';
import { StoreLocatorSummaryPanel } from './store-locator-summary-panel';
import { StoreLocatorSummaryTable } from './store-locator-summary-table';
import { STORE_LOCATOR_SUMMARY_FEATURE } from './store-locator-summary.routes';
import { useStoreLocatorSummary } from './use-store-locator-summary';

export function StoreLocatorSummaryPage() {
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
  } = useStoreLocatorSummary();

  return (
    <section
      className="feature-page"
      data-testid={STORE_LOCATOR_SUMMARY_FEATURE.testId}
    >
      <StoreLocatorSummaryHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <StoreLocatorSummaryFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <StoreLocatorSummaryTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <StoreLocatorSummaryPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default StoreLocatorSummaryPage;
