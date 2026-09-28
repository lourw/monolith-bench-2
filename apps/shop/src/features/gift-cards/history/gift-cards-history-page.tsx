import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { GiftCardsHistoryFilters } from './gift-cards-history-filters';
import { GiftCardsHistoryHeader } from './gift-cards-history-header';
import { GiftCardsHistoryPanel } from './gift-cards-history-panel';
import { GiftCardsHistoryTable } from './gift-cards-history-table';
import { GIFT_CARDS_HISTORY_FEATURE } from './gift-cards-history.routes';
import { useGiftCardsHistory } from './use-gift-cards-history';

export function GiftCardsHistoryPage() {
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
  } = useGiftCardsHistory();

  return (
    <section
      className="feature-page"
      data-testid={GIFT_CARDS_HISTORY_FEATURE.testId}
    >
      <GiftCardsHistoryHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <GiftCardsHistoryFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <GiftCardsHistoryTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <GiftCardsHistoryPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default GiftCardsHistoryPage;
