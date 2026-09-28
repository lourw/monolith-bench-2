import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { GiftCardsListFilters } from './gift-cards-list-filters';
import { GiftCardsListHeader } from './gift-cards-list-header';
import { GiftCardsListPanel } from './gift-cards-list-panel';
import { GiftCardsListTable } from './gift-cards-list-table';
import { GIFT_CARDS_LIST_FEATURE } from './gift-cards-list.routes';
import { useGiftCardsList } from './use-gift-cards-list';

export function GiftCardsListPage() {
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
  } = useGiftCardsList();

  return (
    <section
      className="feature-page"
      data-testid={GIFT_CARDS_LIST_FEATURE.testId}
    >
      <GiftCardsListHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <GiftCardsListFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <GiftCardsListTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <GiftCardsListPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default GiftCardsListPage;
