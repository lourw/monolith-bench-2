import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { OrdersWizardFilters } from './orders-wizard-filters';
import { OrdersWizardHeader } from './orders-wizard-header';
import { OrdersWizardPanel } from './orders-wizard-panel';
import { OrdersWizardTable } from './orders-wizard-table';
import { ORDERS_WIZARD_FEATURE } from './orders-wizard.routes';
import { useOrdersWizard } from './use-orders-wizard';

export function OrdersWizardPage() {
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
  } = useOrdersWizard();

  return (
    <section
      className="feature-page"
      data-testid={ORDERS_WIZARD_FEATURE.testId}
    >
      <OrdersWizardHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <OrdersWizardFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <OrdersWizardTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <OrdersWizardPanel selected={selected} onClear={() => select(null)} />
        </div>
      </div>
    </section>
  );
}

export default OrdersWizardPage;
