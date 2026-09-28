import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { NotificationsSummaryFilters } from './notifications-summary-filters';
import { NotificationsSummaryHeader } from './notifications-summary-header';
import { NotificationsSummaryPanel } from './notifications-summary-panel';
import { NotificationsSummaryTable } from './notifications-summary-table';
import { NOTIFICATIONS_SUMMARY_FEATURE } from './notifications-summary.routes';
import { useNotificationsSummary } from './use-notifications-summary';

export function NotificationsSummaryPage() {
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
  } = useNotificationsSummary();

  return (
    <section
      className="feature-page"
      data-testid={NOTIFICATIONS_SUMMARY_FEATURE.testId}
    >
      <NotificationsSummaryHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <NotificationsSummaryFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <NotificationsSummaryTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <NotificationsSummaryPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default NotificationsSummaryPage;
