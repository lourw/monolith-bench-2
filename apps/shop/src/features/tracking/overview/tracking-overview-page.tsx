import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { TrackingOverviewFilters } from './tracking-overview-filters';
import { TrackingOverviewHeader } from './tracking-overview-header';
import { TrackingOverviewPanel } from './tracking-overview-panel';
import { TrackingOverviewTable } from './tracking-overview-table';
import { TRACKING_OVERVIEW_FEATURE } from './tracking-overview.routes';
import { useTrackingOverview } from './use-tracking-overview';

export function TrackingOverviewPage() {
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
  } = useTrackingOverview();

  return (
    <section
      className="feature-page"
      data-testid={TRACKING_OVERVIEW_FEATURE.testId}
    >
      <TrackingOverviewHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <TrackingOverviewFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <TrackingOverviewTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <TrackingOverviewPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default TrackingOverviewPage;
