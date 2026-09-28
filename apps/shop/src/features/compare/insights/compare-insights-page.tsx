import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { CompareInsightsFilters } from './compare-insights-filters';
import { CompareInsightsHeader } from './compare-insights-header';
import { CompareInsightsPanel } from './compare-insights-panel';
import { CompareInsightsTable } from './compare-insights-table';
import { COMPARE_INSIGHTS_FEATURE } from './compare-insights.routes';
import { useCompareInsights } from './use-compare-insights';

export function CompareInsightsPage() {
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
  } = useCompareInsights();

  return (
    <section
      className="feature-page"
      data-testid={COMPARE_INSIGHTS_FEATURE.testId}
    >
      <CompareInsightsHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <CompareInsightsFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <CompareInsightsTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <CompareInsightsPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default CompareInsightsPage;
