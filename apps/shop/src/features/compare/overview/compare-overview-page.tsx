import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { CompareOverviewFilters } from './compare-overview-filters';
import { CompareOverviewHeader } from './compare-overview-header';
import { CompareOverviewPanel } from './compare-overview-panel';
import { CompareOverviewTable } from './compare-overview-table';
import { COMPARE_OVERVIEW_FEATURE } from './compare-overview.routes';
import { useCompareOverview } from './use-compare-overview';

export function CompareOverviewPage() {
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
  } = useCompareOverview();

  return (
    <section
      className="feature-page"
      data-testid={COMPARE_OVERVIEW_FEATURE.testId}
    >
      <CompareOverviewHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <CompareOverviewFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <CompareOverviewTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <CompareOverviewPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default CompareOverviewPage;
