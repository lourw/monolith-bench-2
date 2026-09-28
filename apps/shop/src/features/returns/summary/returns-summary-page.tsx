import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { ReturnsSummaryFilters } from './returns-summary-filters';
import { ReturnsSummaryHeader } from './returns-summary-header';
import { ReturnsSummaryPanel } from './returns-summary-panel';
import { ReturnsSummaryTable } from './returns-summary-table';
import { RETURNS_SUMMARY_FEATURE } from './returns-summary.routes';
import { useReturnsSummary } from './use-returns-summary';

export function ReturnsSummaryPage() {
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
  } = useReturnsSummary();

  return (
    <section
      className="feature-page"
      data-testid={RETURNS_SUMMARY_FEATURE.testId}
    >
      <ReturnsSummaryHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <ReturnsSummaryFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <ReturnsSummaryTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <ReturnsSummaryPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default ReturnsSummaryPage;
