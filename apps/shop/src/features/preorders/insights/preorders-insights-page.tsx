import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { PreordersInsightsFilters } from './preorders-insights-filters';
import { PreordersInsightsHeader } from './preorders-insights-header';
import { PreordersInsightsPanel } from './preorders-insights-panel';
import { PreordersInsightsTable } from './preorders-insights-table';
import { PREORDERS_INSIGHTS_FEATURE } from './preorders-insights.routes';
import { usePreordersInsights } from './use-preorders-insights';

export function PreordersInsightsPage() {
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
  } = usePreordersInsights();

  return (
    <section
      className="feature-page"
      data-testid={PREORDERS_INSIGHTS_FEATURE.testId}
    >
      <PreordersInsightsHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <PreordersInsightsFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <PreordersInsightsTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <PreordersInsightsPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default PreordersInsightsPage;
