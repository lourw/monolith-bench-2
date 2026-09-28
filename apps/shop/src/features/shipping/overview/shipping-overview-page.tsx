import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { AccountDetailsSummary } from '../../account/details/account-details-summary';
import { ShippingOverviewFilters } from './shipping-overview-filters';
import { ShippingOverviewHeader } from './shipping-overview-header';
import { ShippingOverviewPanel } from './shipping-overview-panel';
import { ShippingOverviewTable } from './shipping-overview-table';
import { SHIPPING_OVERVIEW_FEATURE } from './shipping-overview.routes';
import { useShippingOverview } from './use-shipping-overview';

export function ShippingOverviewPage() {
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
  } = useShippingOverview();

  return (
    <section
      className="feature-page"
      data-testid={SHIPPING_OVERVIEW_FEATURE.testId}
    >
      <ShippingOverviewHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <ShippingOverviewFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <ShippingOverviewTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <ShippingOverviewPanel
            selected={selected}
            onClear={() => select(null)}
          />
          <AccountDetailsSummary compact />
        </div>
      </div>
    </section>
  );
}

export default ShippingOverviewPage;
