import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { CartSettingsSummary } from '../../cart/settings/cart-settings-summary';
import { CheckoutDetailsFilters } from './checkout-details-filters';
import { CheckoutDetailsHeader } from './checkout-details-header';
import { CheckoutDetailsPanel } from './checkout-details-panel';
import { CheckoutDetailsTable } from './checkout-details-table';
import { CHECKOUT_DETAILS_FEATURE } from './checkout-details.routes';
import { useCheckoutDetails } from './use-checkout-details';

export function CheckoutDetailsPage() {
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
  } = useCheckoutDetails();

  return (
    <section
      className="feature-page"
      data-testid={CHECKOUT_DETAILS_FEATURE.testId}
    >
      <CheckoutDetailsHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <CheckoutDetailsFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <CheckoutDetailsTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <CheckoutDetailsPanel
            selected={selected}
            onClear={() => select(null)}
          />
          <CartSettingsSummary compact />
        </div>
      </div>
    </section>
  );
}

export default CheckoutDetailsPage;
