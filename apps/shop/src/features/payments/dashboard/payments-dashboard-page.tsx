import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { PaymentsDashboardFilters } from './payments-dashboard-filters';
import { PaymentsDashboardHeader } from './payments-dashboard-header';
import { PaymentsDashboardPanel } from './payments-dashboard-panel';
import { PaymentsDashboardTable } from './payments-dashboard-table';
import { PAYMENTS_DASHBOARD_FEATURE } from './payments-dashboard.routes';
import { usePaymentsDashboard } from './use-payments-dashboard';

export function PaymentsDashboardPage() {
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
  } = usePaymentsDashboard();

  return (
    <section
      className="feature-page"
      data-testid={PAYMENTS_DASHBOARD_FEATURE.testId}
    >
      <PaymentsDashboardHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <PaymentsDashboardFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <PaymentsDashboardTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <PaymentsDashboardPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default PaymentsDashboardPage;
