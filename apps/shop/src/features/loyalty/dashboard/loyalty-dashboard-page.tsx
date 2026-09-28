import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { ShippingSummarySummary } from '../../shipping/summary/shipping-summary-summary';
import { LoyaltyDashboardFilters } from './loyalty-dashboard-filters';
import { LoyaltyDashboardHeader } from './loyalty-dashboard-header';
import { LoyaltyDashboardPanel } from './loyalty-dashboard-panel';
import { LoyaltyDashboardTable } from './loyalty-dashboard-table';
import { LOYALTY_DASHBOARD_FEATURE } from './loyalty-dashboard.routes';
import { useLoyaltyDashboard } from './use-loyalty-dashboard';

export function LoyaltyDashboardPage() {
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
  } = useLoyaltyDashboard();

  return (
    <section
      className="feature-page"
      data-testid={LOYALTY_DASHBOARD_FEATURE.testId}
    >
      <LoyaltyDashboardHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <LoyaltyDashboardFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <LoyaltyDashboardTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <LoyaltyDashboardPanel
            selected={selected}
            onClear={() => select(null)}
          />
          <ShippingSummarySummary compact />
        </div>
      </div>
    </section>
  );
}

export default LoyaltyDashboardPage;
