import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { ShippingEditorSummary } from '../../shipping/editor/shipping-editor-summary';
import { TrackingDetailsFilters } from './tracking-details-filters';
import { TrackingDetailsHeader } from './tracking-details-header';
import { TrackingDetailsPanel } from './tracking-details-panel';
import { TrackingDetailsTable } from './tracking-details-table';
import { TRACKING_DETAILS_FEATURE } from './tracking-details.routes';
import { useTrackingDetails } from './use-tracking-details';

export function TrackingDetailsPage() {
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
  } = useTrackingDetails();

  return (
    <section
      className="feature-page"
      data-testid={TRACKING_DETAILS_FEATURE.testId}
    >
      <TrackingDetailsHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <TrackingDetailsFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <TrackingDetailsTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <TrackingDetailsPanel
            selected={selected}
            onClear={() => select(null)}
          />
          <ShippingEditorSummary compact />
        </div>
      </div>
    </section>
  );
}

export default TrackingDetailsPage;
