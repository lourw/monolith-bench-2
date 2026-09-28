import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { CatalogInsightsFilters } from './catalog-insights-filters';
import { CatalogInsightsHeader } from './catalog-insights-header';
import { CatalogInsightsPanel } from './catalog-insights-panel';
import { CatalogInsightsTable } from './catalog-insights-table';
import { CATALOG_INSIGHTS_FEATURE } from './catalog-insights.routes';
import { useCatalogInsights } from './use-catalog-insights';

export function CatalogInsightsPage() {
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
  } = useCatalogInsights();

  return (
    <section
      className="feature-page"
      data-testid={CATALOG_INSIGHTS_FEATURE.testId}
    >
      <CatalogInsightsHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <CatalogInsightsFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <CatalogInsightsTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <CatalogInsightsPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default CatalogInsightsPage;
