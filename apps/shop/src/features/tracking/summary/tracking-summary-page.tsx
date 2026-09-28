import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { TrackingSummaryFilters } from './tracking-summary-filters';
import { TrackingSummaryHeader } from './tracking-summary-header';
import { TrackingSummaryPanel } from './tracking-summary-panel';
import { TrackingSummaryTable } from './tracking-summary-table';
import { TRACKING_SUMMARY_FEATURE } from './tracking-summary.routes';
import { useTrackingSummary } from './use-tracking-summary';

export function TrackingSummaryPage() {
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
  } = useTrackingSummary();

  return (
    <section
      className="feature-page"
      data-testid={TRACKING_SUMMARY_FEATURE.testId}
    >
      <TrackingSummaryHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <TrackingSummaryFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <TrackingSummaryTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <TrackingSummaryPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default TrackingSummaryPage;
