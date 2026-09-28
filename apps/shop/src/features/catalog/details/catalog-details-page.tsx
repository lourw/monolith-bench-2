import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { CatalogDetailsFilters } from './catalog-details-filters';
import { CatalogDetailsHeader } from './catalog-details-header';
import { CatalogDetailsPanel } from './catalog-details-panel';
import { CatalogDetailsTable } from './catalog-details-table';
import { CATALOG_DETAILS_FEATURE } from './catalog-details.routes';
import { useCatalogDetails } from './use-catalog-details';

export function CatalogDetailsPage() {
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
  } = useCatalogDetails();

  return (
    <section
      className="feature-page"
      data-testid={CATALOG_DETAILS_FEATURE.testId}
    >
      <CatalogDetailsHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <CatalogDetailsFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <CatalogDetailsTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <CatalogDetailsPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default CatalogDetailsPage;
