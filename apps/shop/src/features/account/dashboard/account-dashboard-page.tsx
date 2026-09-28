import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { CheckoutSummarySummary } from '../../checkout/summary/checkout-summary-summary';
import { AccountDashboardFilters } from './account-dashboard-filters';
import { AccountDashboardHeader } from './account-dashboard-header';
import { AccountDashboardPanel } from './account-dashboard-panel';
import { AccountDashboardTable } from './account-dashboard-table';
import { ACCOUNT_DASHBOARD_FEATURE } from './account-dashboard.routes';
import { useAccountDashboard } from './use-account-dashboard';

export function AccountDashboardPage() {
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
  } = useAccountDashboard();

  return (
    <section
      className="feature-page"
      data-testid={ACCOUNT_DASHBOARD_FEATURE.testId}
    >
      <AccountDashboardHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <AccountDashboardFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <AccountDashboardTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <AccountDashboardPanel
            selected={selected}
            onClear={() => select(null)}
          />
          <CheckoutSummarySummary compact />
        </div>
      </div>
    </section>
  );
}

export default AccountDashboardPage;
