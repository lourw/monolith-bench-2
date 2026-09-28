import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { PromotionsOverviewSummary } from '../overview/promotions-overview-summary';
import { PromotionsListFilters } from './promotions-list-filters';
import { PromotionsListHeader } from './promotions-list-header';
import { PromotionsListPanel } from './promotions-list-panel';
import { PromotionsListTable } from './promotions-list-table';
import { PROMOTIONS_LIST_FEATURE } from './promotions-list.routes';
import { usePromotionsList } from './use-promotions-list';

export function PromotionsListPage() {
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
  } = usePromotionsList();

  return (
    <section
      className="feature-page"
      data-testid={PROMOTIONS_LIST_FEATURE.testId}
    >
      <PromotionsListHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <PromotionsListFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <PromotionsListTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <PromotionsListPanel
            selected={selected}
            onClear={() => select(null)}
          />
          <PromotionsOverviewSummary compact />
        </div>
      </div>
    </section>
  );
}

export default PromotionsListPage;
