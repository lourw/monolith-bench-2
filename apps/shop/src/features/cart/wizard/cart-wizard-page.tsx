import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { CartWizardFilters } from './cart-wizard-filters';
import { CartWizardHeader } from './cart-wizard-header';
import { CartWizardPanel } from './cart-wizard-panel';
import { CartWizardTable } from './cart-wizard-table';
import { CART_WIZARD_FEATURE } from './cart-wizard.routes';
import { useCartWizard } from './use-cart-wizard';

export function CartWizardPage() {
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
  } = useCartWizard();

  return (
    <section className="feature-page" data-testid={CART_WIZARD_FEATURE.testId}>
      <CartWizardHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <CartWizardFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <CartWizardTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <CartWizardPanel selected={selected} onClear={() => select(null)} />
        </div>
      </div>
    </section>
  );
}

export default CartWizardPage;
