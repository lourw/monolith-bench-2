import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { GiftCardsOverviewFilters } from './gift-cards-overview-filters';
import { GiftCardsOverviewHeader } from './gift-cards-overview-header';
import { GiftCardsOverviewPanel } from './gift-cards-overview-panel';
import { GiftCardsOverviewTable } from './gift-cards-overview-table';
import { GIFT_CARDS_OVERVIEW_FEATURE } from './gift-cards-overview.routes';
import { useGiftCardsOverview } from './use-gift-cards-overview';

export function GiftCardsOverviewPage() {
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
  } = useGiftCardsOverview();

  return (
    <section
      className="feature-page"
      data-testid={GIFT_CARDS_OVERVIEW_FEATURE.testId}
    >
      <GiftCardsOverviewHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <GiftCardsOverviewFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <GiftCardsOverviewTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <GiftCardsOverviewPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default GiftCardsOverviewPage;
