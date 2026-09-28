import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { AnalyticsHistoryFilters } from './analytics-history-filters';
import { AnalyticsHistoryHeader } from './analytics-history-header';
import { AnalyticsHistoryPanel } from './analytics-history-panel';
import { AnalyticsHistoryTable } from './analytics-history-table';
import { ANALYTICS_HISTORY_FEATURE } from './analytics-history.routes';
import { useAnalyticsHistory } from './use-analytics-history';

export function AnalyticsHistoryPage() {
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
  } = useAnalyticsHistory();

  return (
    <section
      className="feature-page"
      data-testid={ANALYTICS_HISTORY_FEATURE.testId}
    >
      <AnalyticsHistoryHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <AnalyticsHistoryFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <AnalyticsHistoryTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <AnalyticsHistoryPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default AnalyticsHistoryPage;
