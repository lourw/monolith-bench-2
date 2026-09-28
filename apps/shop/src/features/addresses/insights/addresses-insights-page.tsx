import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { AddressesInsightsFilters } from './addresses-insights-filters';
import { AddressesInsightsHeader } from './addresses-insights-header';
import { AddressesInsightsPanel } from './addresses-insights-panel';
import { AddressesInsightsTable } from './addresses-insights-table';
import { ADDRESSES_INSIGHTS_FEATURE } from './addresses-insights.routes';
import { useAddressesInsights } from './use-addresses-insights';

export function AddressesInsightsPage() {
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
  } = useAddressesInsights();

  return (
    <section
      className="feature-page"
      data-testid={ADDRESSES_INSIGHTS_FEATURE.testId}
    >
      <AddressesInsightsHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <AddressesInsightsFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <AddressesInsightsTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <AddressesInsightsPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default AddressesInsightsPage;
