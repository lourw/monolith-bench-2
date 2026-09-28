import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { PromotionsHistoryFilters } from './promotions-history-filters';
import { PromotionsHistoryHeader } from './promotions-history-header';
import { PromotionsHistoryPanel } from './promotions-history-panel';
import { PromotionsHistoryTable } from './promotions-history-table';
import { PROMOTIONS_HISTORY_FEATURE } from './promotions-history.routes';
import { usePromotionsHistory } from './use-promotions-history';

export function PromotionsHistoryPage() {
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
  } = usePromotionsHistory();

  return (
    <section
      className="feature-page"
      data-testid={PROMOTIONS_HISTORY_FEATURE.testId}
    >
      <PromotionsHistoryHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <PromotionsHistoryFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <PromotionsHistoryTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <PromotionsHistoryPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default PromotionsHistoryPage;
