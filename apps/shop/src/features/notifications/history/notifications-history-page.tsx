import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { NotificationsHistoryFilters } from './notifications-history-filters';
import { NotificationsHistoryHeader } from './notifications-history-header';
import { NotificationsHistoryPanel } from './notifications-history-panel';
import { NotificationsHistoryTable } from './notifications-history-table';
import { NOTIFICATIONS_HISTORY_FEATURE } from './notifications-history.routes';
import { useNotificationsHistory } from './use-notifications-history';

export function NotificationsHistoryPage() {
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
  } = useNotificationsHistory();

  return (
    <section
      className="feature-page"
      data-testid={NOTIFICATIONS_HISTORY_FEATURE.testId}
    >
      <NotificationsHistoryHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <NotificationsHistoryFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <NotificationsHistoryTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <NotificationsHistoryPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default NotificationsHistoryPage;
