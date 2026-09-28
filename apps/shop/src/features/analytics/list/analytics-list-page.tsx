import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { AnalyticsListFilters } from './analytics-list-filters';
import { AnalyticsListHeader } from './analytics-list-header';
import { AnalyticsListPanel } from './analytics-list-panel';
import { AnalyticsListTable } from './analytics-list-table';
import { ANALYTICS_LIST_FEATURE } from './analytics-list.routes';
import { useAnalyticsList } from './use-analytics-list';

export function AnalyticsListPage() {
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
  } = useAnalyticsList();

  return (
    <section
      className="feature-page"
      data-testid={ANALYTICS_LIST_FEATURE.testId}
    >
      <AnalyticsListHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <AnalyticsListFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <AnalyticsListTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <AnalyticsListPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default AnalyticsListPage;
