import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { CheckoutDashboardSummary } from '../../checkout/dashboard/checkout-dashboard-summary';
import { GiftCardsSummaryFilters } from './gift-cards-summary-filters';
import { GiftCardsSummaryHeader } from './gift-cards-summary-header';
import { GiftCardsSummaryPanel } from './gift-cards-summary-panel';
import { GiftCardsSummaryTable } from './gift-cards-summary-table';
import { GIFT_CARDS_SUMMARY_FEATURE } from './gift-cards-summary.routes';
import { useGiftCardsSummary } from './use-gift-cards-summary';

export function GiftCardsSummaryPage() {
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
  } = useGiftCardsSummary();

  return (
    <section
      className="feature-page"
      data-testid={GIFT_CARDS_SUMMARY_FEATURE.testId}
    >
      <GiftCardsSummaryHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <GiftCardsSummaryFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <GiftCardsSummaryTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <GiftCardsSummaryPanel
            selected={selected}
            onClear={() => select(null)}
          />
          <CheckoutDashboardSummary compact />
        </div>
      </div>
    </section>
  );
}

export default GiftCardsSummaryPage;
