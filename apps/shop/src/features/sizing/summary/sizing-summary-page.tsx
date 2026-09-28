import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { SizingSummaryFilters } from './sizing-summary-filters';
import { SizingSummaryHeader } from './sizing-summary-header';
import { SizingSummaryPanel } from './sizing-summary-panel';
import { SizingSummaryTable } from './sizing-summary-table';
import { SIZING_SUMMARY_FEATURE } from './sizing-summary.routes';
import { useSizingSummary } from './use-sizing-summary';

export function SizingSummaryPage() {
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
  } = useSizingSummary();

  return (
    <section
      className="feature-page"
      data-testid={SIZING_SUMMARY_FEATURE.testId}
    >
      <SizingSummaryHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <SizingSummaryFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <SizingSummaryTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <SizingSummaryPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default SizingSummaryPage;
