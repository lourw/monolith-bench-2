import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { NotificationsDashboardFilters } from './notifications-dashboard-filters';
import { NotificationsDashboardHeader } from './notifications-dashboard-header';
import { NotificationsDashboardPanel } from './notifications-dashboard-panel';
import { NotificationsDashboardTable } from './notifications-dashboard-table';
import { NOTIFICATIONS_DASHBOARD_FEATURE } from './notifications-dashboard.routes';
import { useNotificationsDashboard } from './use-notifications-dashboard';

export function NotificationsDashboardPage() {
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
  } = useNotificationsDashboard();

  return (
    <section
      className="feature-page"
      data-testid={NOTIFICATIONS_DASHBOARD_FEATURE.testId}
    >
      <NotificationsDashboardHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <NotificationsDashboardFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <NotificationsDashboardTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <NotificationsDashboardPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default NotificationsDashboardPage;
