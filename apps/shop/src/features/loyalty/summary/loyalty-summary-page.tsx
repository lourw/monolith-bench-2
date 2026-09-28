import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { LoyaltySummaryFilters } from './loyalty-summary-filters';
import { LoyaltySummaryHeader } from './loyalty-summary-header';
import { LoyaltySummaryPanel } from './loyalty-summary-panel';
import { LoyaltySummaryTable } from './loyalty-summary-table';
import { LOYALTY_SUMMARY_FEATURE } from './loyalty-summary.routes';
import { useLoyaltySummary } from './use-loyalty-summary';

export function LoyaltySummaryPage() {
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
  } = useLoyaltySummary();

  return (
    <section
      className="feature-page"
      data-testid={LOYALTY_SUMMARY_FEATURE.testId}
    >
      <LoyaltySummaryHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <LoyaltySummaryFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <LoyaltySummaryTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <LoyaltySummaryPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default LoyaltySummaryPage;
