import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { NotificationsDetailsFilters } from './notifications-details-filters';
import { NotificationsDetailsHeader } from './notifications-details-header';
import { NotificationsDetailsPanel } from './notifications-details-panel';
import { NotificationsDetailsTable } from './notifications-details-table';
import { NOTIFICATIONS_DETAILS_FEATURE } from './notifications-details.routes';
import { useNotificationsDetails } from './use-notifications-details';

export function NotificationsDetailsPage() {
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
  } = useNotificationsDetails();

  return (
    <section
      className="feature-page"
      data-testid={NOTIFICATIONS_DETAILS_FEATURE.testId}
    >
      <NotificationsDetailsHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <NotificationsDetailsFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <NotificationsDetailsTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <NotificationsDetailsPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default NotificationsDetailsPage;
