import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { CartListSummary } from '../../cart/list/cart-list-summary';
import { ReturnsDashboardFilters } from './returns-dashboard-filters';
import { ReturnsDashboardHeader } from './returns-dashboard-header';
import { ReturnsDashboardPanel } from './returns-dashboard-panel';
import { ReturnsDashboardTable } from './returns-dashboard-table';
import { RETURNS_DASHBOARD_FEATURE } from './returns-dashboard.routes';
import { useReturnsDashboard } from './use-returns-dashboard';

export function ReturnsDashboardPage() {
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
  } = useReturnsDashboard();

  return (
    <section
      className="feature-page"
      data-testid={RETURNS_DASHBOARD_FEATURE.testId}
    >
      <ReturnsDashboardHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <ReturnsDashboardFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <ReturnsDashboardTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <ReturnsDashboardPanel
            selected={selected}
            onClear={() => select(null)}
          />
          <CartListSummary compact />
        </div>
      </div>
    </section>
  );
}

export default ReturnsDashboardPage;
