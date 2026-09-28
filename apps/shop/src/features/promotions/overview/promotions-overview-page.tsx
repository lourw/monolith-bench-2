import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { PromotionsOverviewFilters } from './promotions-overview-filters';
import { PromotionsOverviewHeader } from './promotions-overview-header';
import { PromotionsOverviewPanel } from './promotions-overview-panel';
import { PromotionsOverviewTable } from './promotions-overview-table';
import { PROMOTIONS_OVERVIEW_FEATURE } from './promotions-overview.routes';
import { usePromotionsOverview } from './use-promotions-overview';

export function PromotionsOverviewPage() {
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
  } = usePromotionsOverview();

  return (
    <section
      className="feature-page"
      data-testid={PROMOTIONS_OVERVIEW_FEATURE.testId}
    >
      <PromotionsOverviewHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <PromotionsOverviewFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <PromotionsOverviewTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <PromotionsOverviewPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default PromotionsOverviewPage;
