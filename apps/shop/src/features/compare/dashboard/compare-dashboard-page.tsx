import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { CompareDashboardFilters } from './compare-dashboard-filters';
import { CompareDashboardHeader } from './compare-dashboard-header';
import { CompareDashboardPanel } from './compare-dashboard-panel';
import { CompareDashboardTable } from './compare-dashboard-table';
import { COMPARE_DASHBOARD_FEATURE } from './compare-dashboard.routes';
import { useCompareDashboard } from './use-compare-dashboard';

export function CompareDashboardPage() {
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
  } = useCompareDashboard();

  return (
    <section
      className="feature-page"
      data-testid={COMPARE_DASHBOARD_FEATURE.testId}
    >
      <CompareDashboardHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <CompareDashboardFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <CompareDashboardTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <CompareDashboardPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default CompareDashboardPage;
