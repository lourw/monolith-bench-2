import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { AnalyticsSummaryFilters } from './analytics-summary-filters';
import { AnalyticsSummaryHeader } from './analytics-summary-header';
import { AnalyticsSummaryPanel } from './analytics-summary-panel';
import { AnalyticsSummaryTable } from './analytics-summary-table';
import { ANALYTICS_SUMMARY_FEATURE } from './analytics-summary.routes';
import { useAnalyticsSummary } from './use-analytics-summary';

export function AnalyticsSummaryPage() {
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
  } = useAnalyticsSummary();

  return (
    <section
      className="feature-page"
      data-testid={ANALYTICS_SUMMARY_FEATURE.testId}
    >
      <AnalyticsSummaryHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <AnalyticsSummaryFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <AnalyticsSummaryTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <AnalyticsSummaryPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default AnalyticsSummaryPage;
