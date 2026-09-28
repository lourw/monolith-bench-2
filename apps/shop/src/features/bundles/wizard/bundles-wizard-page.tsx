import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { OrdersListSummary } from '../../orders/list/orders-list-summary';
import { BundlesWizardFilters } from './bundles-wizard-filters';
import { BundlesWizardHeader } from './bundles-wizard-header';
import { BundlesWizardPanel } from './bundles-wizard-panel';
import { BundlesWizardTable } from './bundles-wizard-table';
import { BUNDLES_WIZARD_FEATURE } from './bundles-wizard.routes';
import { useBundlesWizard } from './use-bundles-wizard';

export function BundlesWizardPage() {
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
  } = useBundlesWizard();

  return (
    <section
      className="feature-page"
      data-testid={BUNDLES_WIZARD_FEATURE.testId}
    >
      <BundlesWizardHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <BundlesWizardFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <BundlesWizardTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <BundlesWizardPanel
            selected={selected}
            onClear={() => select(null)}
          />
          <OrdersListSummary compact />
        </div>
      </div>
    </section>
  );
}

export default BundlesWizardPage;
