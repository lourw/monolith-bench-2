import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { CatalogOverviewFilters } from './catalog-overview-filters';
import { CatalogOverviewHeader } from './catalog-overview-header';
import { CatalogOverviewPanel } from './catalog-overview-panel';
import { CatalogOverviewTable } from './catalog-overview-table';
import { CATALOG_OVERVIEW_FEATURE } from './catalog-overview.routes';
import { useCatalogOverview } from './use-catalog-overview';

export function CatalogOverviewPage() {
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
  } = useCatalogOverview();

  return (
    <section
      className="feature-page"
      data-testid={CATALOG_OVERVIEW_FEATURE.testId}
    >
      <CatalogOverviewHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <CatalogOverviewFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <CatalogOverviewTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <CatalogOverviewPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default CatalogOverviewPage;
