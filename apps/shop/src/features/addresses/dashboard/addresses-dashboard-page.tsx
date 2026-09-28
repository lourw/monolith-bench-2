import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { AddressesDashboardFilters } from './addresses-dashboard-filters';
import { AddressesDashboardHeader } from './addresses-dashboard-header';
import { AddressesDashboardPanel } from './addresses-dashboard-panel';
import { AddressesDashboardTable } from './addresses-dashboard-table';
import { ADDRESSES_DASHBOARD_FEATURE } from './addresses-dashboard.routes';
import { useAddressesDashboard } from './use-addresses-dashboard';

export function AddressesDashboardPage() {
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
  } = useAddressesDashboard();

  return (
    <section
      className="feature-page"
      data-testid={ADDRESSES_DASHBOARD_FEATURE.testId}
    >
      <AddressesDashboardHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <AddressesDashboardFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <AddressesDashboardTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <AddressesDashboardPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default AddressesDashboardPage;
