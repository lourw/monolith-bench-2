import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { CheckoutHistorySummary } from '../../checkout/history/checkout-history-summary';
import { PaymentsWizardFilters } from './payments-wizard-filters';
import { PaymentsWizardHeader } from './payments-wizard-header';
import { PaymentsWizardPanel } from './payments-wizard-panel';
import { PaymentsWizardTable } from './payments-wizard-table';
import { PAYMENTS_WIZARD_FEATURE } from './payments-wizard.routes';
import { usePaymentsWizard } from './use-payments-wizard';

export function PaymentsWizardPage() {
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
  } = usePaymentsWizard();

  return (
    <section
      className="feature-page"
      data-testid={PAYMENTS_WIZARD_FEATURE.testId}
    >
      <PaymentsWizardHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <PaymentsWizardFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <PaymentsWizardTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <PaymentsWizardPanel
            selected={selected}
            onClear={() => select(null)}
          />
          <CheckoutHistorySummary compact />
        </div>
      </div>
    </section>
  );
}

export default PaymentsWizardPage;
