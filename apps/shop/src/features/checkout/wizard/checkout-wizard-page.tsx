import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { CartListSummary } from '../../cart/list/cart-list-summary';
import { CheckoutWizardFilters } from './checkout-wizard-filters';
import { CheckoutWizardHeader } from './checkout-wizard-header';
import { CheckoutWizardPanel } from './checkout-wizard-panel';
import { CheckoutWizardTable } from './checkout-wizard-table';
import { CHECKOUT_WIZARD_FEATURE } from './checkout-wizard.routes';
import { useCheckoutWizard } from './use-checkout-wizard';

export function CheckoutWizardPage() {
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
  } = useCheckoutWizard();

  return (
    <section
      className="feature-page"
      data-testid={CHECKOUT_WIZARD_FEATURE.testId}
    >
      <CheckoutWizardHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <CheckoutWizardFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <CheckoutWizardTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <CheckoutWizardPanel
            selected={selected}
            onClear={() => select(null)}
          />
          <CartListSummary compact />
        </div>
      </div>
    </section>
  );
}

export default CheckoutWizardPage;
