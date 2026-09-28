import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { StoreLocatorDetailsFilters } from './store-locator-details-filters';
import { StoreLocatorDetailsHeader } from './store-locator-details-header';
import { StoreLocatorDetailsPanel } from './store-locator-details-panel';
import { StoreLocatorDetailsTable } from './store-locator-details-table';
import { STORE_LOCATOR_DETAILS_FEATURE } from './store-locator-details.routes';
import { useStoreLocatorDetails } from './use-store-locator-details';

export function StoreLocatorDetailsPage() {
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
  } = useStoreLocatorDetails();

  return (
    <section
      className="feature-page"
      data-testid={STORE_LOCATOR_DETAILS_FEATURE.testId}
    >
      <StoreLocatorDetailsHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <StoreLocatorDetailsFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <StoreLocatorDetailsTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <StoreLocatorDetailsPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default StoreLocatorDetailsPage;
