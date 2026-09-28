import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { GiftCardsDashboardFilters } from './gift-cards-dashboard-filters';
import { GiftCardsDashboardHeader } from './gift-cards-dashboard-header';
import { GiftCardsDashboardPanel } from './gift-cards-dashboard-panel';
import { GiftCardsDashboardTable } from './gift-cards-dashboard-table';
import { GIFT_CARDS_DASHBOARD_FEATURE } from './gift-cards-dashboard.routes';
import { useGiftCardsDashboard } from './use-gift-cards-dashboard';

export function GiftCardsDashboardPage() {
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
  } = useGiftCardsDashboard();

  return (
    <section
      className="feature-page"
      data-testid={GIFT_CARDS_DASHBOARD_FEATURE.testId}
    >
      <GiftCardsDashboardHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <GiftCardsDashboardFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <GiftCardsDashboardTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <GiftCardsDashboardPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default GiftCardsDashboardPage;
