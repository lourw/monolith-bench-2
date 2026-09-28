import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { GiftCardsDetailsSummary } from '../../gift-cards/details/gift-cards-details-summary';
import { CompareSummaryFilters } from './compare-summary-filters';
import { CompareSummaryHeader } from './compare-summary-header';
import { CompareSummaryPanel } from './compare-summary-panel';
import { CompareSummaryTable } from './compare-summary-table';
import { COMPARE_SUMMARY_FEATURE } from './compare-summary.routes';
import { useCompareSummary } from './use-compare-summary';

export function CompareSummaryPage() {
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
  } = useCompareSummary();

  return (
    <section
      className="feature-page"
      data-testid={COMPARE_SUMMARY_FEATURE.testId}
    >
      <CompareSummaryHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <CompareSummaryFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <CompareSummaryTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <CompareSummaryPanel
            selected={selected}
            onClear={() => select(null)}
          />
          <GiftCardsDetailsSummary compact />
        </div>
      </div>
    </section>
  );
}

export default CompareSummaryPage;
