import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { OrdersWizardSummary } from '../../orders/wizard/orders-wizard-summary';
import { BundlesDetailsFilters } from './bundles-details-filters';
import { BundlesDetailsHeader } from './bundles-details-header';
import { BundlesDetailsPanel } from './bundles-details-panel';
import { BundlesDetailsTable } from './bundles-details-table';
import { BUNDLES_DETAILS_FEATURE } from './bundles-details.routes';
import { useBundlesDetails } from './use-bundles-details';

export function BundlesDetailsPage() {
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
  } = useBundlesDetails();

  return (
    <section
      className="feature-page"
      data-testid={BUNDLES_DETAILS_FEATURE.testId}
    >
      <BundlesDetailsHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <BundlesDetailsFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <BundlesDetailsTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <BundlesDetailsPanel
            selected={selected}
            onClear={() => select(null)}
          />
          <OrdersWizardSummary compact />
        </div>
      </div>
    </section>
  );
}

export default BundlesDetailsPage;
