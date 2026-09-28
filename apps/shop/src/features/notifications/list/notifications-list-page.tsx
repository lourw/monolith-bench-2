import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { NotificationsListFilters } from './notifications-list-filters';
import { NotificationsListHeader } from './notifications-list-header';
import { NotificationsListPanel } from './notifications-list-panel';
import { NotificationsListTable } from './notifications-list-table';
import { NOTIFICATIONS_LIST_FEATURE } from './notifications-list.routes';
import { useNotificationsList } from './use-notifications-list';

export function NotificationsListPage() {
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
  } = useNotificationsList();

  return (
    <section
      className="feature-page"
      data-testid={NOTIFICATIONS_LIST_FEATURE.testId}
    >
      <NotificationsListHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <NotificationsListFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <NotificationsListTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <NotificationsListPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default NotificationsListPage;
