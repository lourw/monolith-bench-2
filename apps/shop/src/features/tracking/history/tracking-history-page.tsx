import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { TrackingHistoryFilters } from './tracking-history-filters';
import { TrackingHistoryHeader } from './tracking-history-header';
import { TrackingHistoryPanel } from './tracking-history-panel';
import { TrackingHistoryTable } from './tracking-history-table';
import { TRACKING_HISTORY_FEATURE } from './tracking-history.routes';
import { useTrackingHistory } from './use-tracking-history';

export function TrackingHistoryPage() {
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
  } = useTrackingHistory();

  return (
    <section
      className="feature-page"
      data-testid={TRACKING_HISTORY_FEATURE.testId}
    >
      <TrackingHistoryHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <TrackingHistoryFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <TrackingHistoryTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <TrackingHistoryPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default TrackingHistoryPage;
