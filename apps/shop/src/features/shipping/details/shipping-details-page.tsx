import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { ShippingDetailsFilters } from './shipping-details-filters';
import { ShippingDetailsHeader } from './shipping-details-header';
import { ShippingDetailsPanel } from './shipping-details-panel';
import { ShippingDetailsTable } from './shipping-details-table';
import { SHIPPING_DETAILS_FEATURE } from './shipping-details.routes';
import { useShippingDetails } from './use-shipping-details';

export function ShippingDetailsPage() {
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
  } = useShippingDetails();

  return (
    <section
      className="feature-page"
      data-testid={SHIPPING_DETAILS_FEATURE.testId}
    >
      <ShippingDetailsHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <ShippingDetailsFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <ShippingDetailsTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <ShippingDetailsPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default ShippingDetailsPage;
