import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { CatalogDashboardFilters } from './catalog-dashboard-filters';
import { CatalogDashboardHeader } from './catalog-dashboard-header';
import { CatalogDashboardPanel } from './catalog-dashboard-panel';
import { CatalogDashboardTable } from './catalog-dashboard-table';
import { CATALOG_DASHBOARD_FEATURE } from './catalog-dashboard.routes';
import { useCatalogDashboard } from './use-catalog-dashboard';

export function CatalogDashboardPage() {
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
  } = useCatalogDashboard();

  return (
    <section
      className="feature-page"
      data-testid={CATALOG_DASHBOARD_FEATURE.testId}
    >
      <CatalogDashboardHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <CatalogDashboardFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <CatalogDashboardTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <CatalogDashboardPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default CatalogDashboardPage;
