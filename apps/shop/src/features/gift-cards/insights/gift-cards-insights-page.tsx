import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { ReturnsListSummary } from '../../returns/list/returns-list-summary';
import { GiftCardsInsightsFilters } from './gift-cards-insights-filters';
import { GiftCardsInsightsHeader } from './gift-cards-insights-header';
import { GiftCardsInsightsPanel } from './gift-cards-insights-panel';
import { GiftCardsInsightsTable } from './gift-cards-insights-table';
import { GIFT_CARDS_INSIGHTS_FEATURE } from './gift-cards-insights.routes';
import { useGiftCardsInsights } from './use-gift-cards-insights';

export function GiftCardsInsightsPage() {
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
  } = useGiftCardsInsights();

  return (
    <section
      className="feature-page"
      data-testid={GIFT_CARDS_INSIGHTS_FEATURE.testId}
    >
      <GiftCardsInsightsHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <GiftCardsInsightsFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <GiftCardsInsightsTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <GiftCardsInsightsPanel
            selected={selected}
            onClear={() => select(null)}
          />
          <ReturnsListSummary compact />
        </div>
      </div>
    </section>
  );
}

export default GiftCardsInsightsPage;
