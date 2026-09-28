import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { PreordersSummaryFilters } from './preorders-summary-filters';
import { PreordersSummaryHeader } from './preorders-summary-header';
import { PreordersSummaryPanel } from './preorders-summary-panel';
import { PreordersSummaryTable } from './preorders-summary-table';
import { PREORDERS_SUMMARY_FEATURE } from './preorders-summary.routes';
import { usePreordersSummary } from './use-preorders-summary';

export function PreordersSummaryPage() {
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
  } = usePreordersSummary();

  return (
    <section
      className="feature-page"
      data-testid={PREORDERS_SUMMARY_FEATURE.testId}
    >
      <PreordersSummaryHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <PreordersSummaryFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <PreordersSummaryTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <PreordersSummaryPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default PreordersSummaryPage;
