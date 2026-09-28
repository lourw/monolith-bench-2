import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { CartWizardSummary } from '../../cart/wizard/cart-wizard-summary';
import { CheckoutSummaryFilters } from './checkout-summary-filters';
import { CheckoutSummaryHeader } from './checkout-summary-header';
import { CheckoutSummaryPanel } from './checkout-summary-panel';
import { CheckoutSummaryTable } from './checkout-summary-table';
import { CHECKOUT_SUMMARY_FEATURE } from './checkout-summary.routes';
import { useCheckoutSummary } from './use-checkout-summary';

export function CheckoutSummaryPage() {
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
  } = useCheckoutSummary();

  return (
    <section
      className="feature-page"
      data-testid={CHECKOUT_SUMMARY_FEATURE.testId}
    >
      <CheckoutSummaryHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <CheckoutSummaryFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <CheckoutSummaryTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <CheckoutSummaryPanel
            selected={selected}
            onClear={() => select(null)}
          />
          <CartWizardSummary compact />
        </div>
      </div>
    </section>
  );
}

export default CheckoutSummaryPage;
