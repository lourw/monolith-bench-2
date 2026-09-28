import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { AnalyticsDetailsFilters } from './analytics-details-filters';
import { AnalyticsDetailsHeader } from './analytics-details-header';
import { AnalyticsDetailsPanel } from './analytics-details-panel';
import { AnalyticsDetailsTable } from './analytics-details-table';
import { ANALYTICS_DETAILS_FEATURE } from './analytics-details.routes';
import { useAnalyticsDetails } from './use-analytics-details';

export function AnalyticsDetailsPage() {
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
  } = useAnalyticsDetails();

  return (
    <section
      className="feature-page"
      data-testid={ANALYTICS_DETAILS_FEATURE.testId}
    >
      <AnalyticsDetailsHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <AnalyticsDetailsFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <AnalyticsDetailsTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <AnalyticsDetailsPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default AnalyticsDetailsPage;
