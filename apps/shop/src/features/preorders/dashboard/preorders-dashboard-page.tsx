import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { PreordersDashboardFilters } from './preorders-dashboard-filters';
import { PreordersDashboardHeader } from './preorders-dashboard-header';
import { PreordersDashboardPanel } from './preorders-dashboard-panel';
import { PreordersDashboardTable } from './preorders-dashboard-table';
import { PREORDERS_DASHBOARD_FEATURE } from './preorders-dashboard.routes';
import { usePreordersDashboard } from './use-preorders-dashboard';

export function PreordersDashboardPage() {
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
  } = usePreordersDashboard();

  return (
    <section
      className="feature-page"
      data-testid={PREORDERS_DASHBOARD_FEATURE.testId}
    >
      <PreordersDashboardHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <PreordersDashboardFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <PreordersDashboardTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <PreordersDashboardPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default PreordersDashboardPage;
