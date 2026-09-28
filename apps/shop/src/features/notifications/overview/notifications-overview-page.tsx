import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { PaymentsDetailsSummary } from '../../payments/details/payments-details-summary';
import { NotificationsOverviewFilters } from './notifications-overview-filters';
import { NotificationsOverviewHeader } from './notifications-overview-header';
import { NotificationsOverviewPanel } from './notifications-overview-panel';
import { NotificationsOverviewTable } from './notifications-overview-table';
import { NOTIFICATIONS_OVERVIEW_FEATURE } from './notifications-overview.routes';
import { useNotificationsOverview } from './use-notifications-overview';

export function NotificationsOverviewPage() {
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
  } = useNotificationsOverview();

  return (
    <section
      className="feature-page"
      data-testid={NOTIFICATIONS_OVERVIEW_FEATURE.testId}
    >
      <NotificationsOverviewHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <NotificationsOverviewFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <NotificationsOverviewTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <NotificationsOverviewPanel
            selected={selected}
            onClear={() => select(null)}
          />
          <PaymentsDetailsSummary compact />
        </div>
      </div>
    </section>
  );
}

export default NotificationsOverviewPage;
