import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { TrackingListFilters } from './tracking-list-filters';
import { TrackingListHeader } from './tracking-list-header';
import { TrackingListPanel } from './tracking-list-panel';
import { TrackingListTable } from './tracking-list-table';
import { TRACKING_LIST_FEATURE } from './tracking-list.routes';
import { useTrackingList } from './use-tracking-list';

export function TrackingListPage() {
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
  } = useTrackingList();

  return (
    <section
      className="feature-page"
      data-testid={TRACKING_LIST_FEATURE.testId}
    >
      <TrackingListHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <TrackingListFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <TrackingListTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <TrackingListPanel selected={selected} onClear={() => select(null)} />
        </div>
      </div>
    </section>
  );
}

export default TrackingListPage;
