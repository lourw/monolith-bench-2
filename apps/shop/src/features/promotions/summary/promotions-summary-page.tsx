import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { PromotionsSummaryFilters } from './promotions-summary-filters';
import { PromotionsSummaryHeader } from './promotions-summary-header';
import { PromotionsSummaryPanel } from './promotions-summary-panel';
import { PromotionsSummaryTable } from './promotions-summary-table';
import { PROMOTIONS_SUMMARY_FEATURE } from './promotions-summary.routes';
import { usePromotionsSummary } from './use-promotions-summary';

export function PromotionsSummaryPage() {
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
  } = usePromotionsSummary();

  return (
    <section
      className="feature-page"
      data-testid={PROMOTIONS_SUMMARY_FEATURE.testId}
    >
      <PromotionsSummaryHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <PromotionsSummaryFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <PromotionsSummaryTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <PromotionsSummaryPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default PromotionsSummaryPage;
