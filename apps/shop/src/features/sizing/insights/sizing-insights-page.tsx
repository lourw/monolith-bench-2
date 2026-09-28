import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { SizingInsightsFilters } from './sizing-insights-filters';
import { SizingInsightsHeader } from './sizing-insights-header';
import { SizingInsightsPanel } from './sizing-insights-panel';
import { SizingInsightsTable } from './sizing-insights-table';
import { SIZING_INSIGHTS_FEATURE } from './sizing-insights.routes';
import { useSizingInsights } from './use-sizing-insights';

export function SizingInsightsPage() {
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
  } = useSizingInsights();

  return (
    <section
      className="feature-page"
      data-testid={SIZING_INSIGHTS_FEATURE.testId}
    >
      <SizingInsightsHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <SizingInsightsFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <SizingInsightsTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <SizingInsightsPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default SizingInsightsPage;
