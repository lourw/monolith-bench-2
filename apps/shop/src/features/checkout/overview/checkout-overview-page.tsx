import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { CheckoutOverviewFilters } from './checkout-overview-filters';
import { CheckoutOverviewHeader } from './checkout-overview-header';
import { CheckoutOverviewPanel } from './checkout-overview-panel';
import { CheckoutOverviewTable } from './checkout-overview-table';
import { CHECKOUT_OVERVIEW_FEATURE } from './checkout-overview.routes';
import { useCheckoutOverview } from './use-checkout-overview';

export function CheckoutOverviewPage() {
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
  } = useCheckoutOverview();

  return (
    <section
      className="feature-page"
      data-testid={CHECKOUT_OVERVIEW_FEATURE.testId}
    >
      <CheckoutOverviewHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <CheckoutOverviewFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <CheckoutOverviewTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <CheckoutOverviewPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default CheckoutOverviewPage;
