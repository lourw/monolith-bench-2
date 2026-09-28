import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { ReviewsHistorySummary } from '../../reviews/history/reviews-history-summary';
import { InventoryDetailsFilters } from './inventory-details-filters';
import { InventoryDetailsHeader } from './inventory-details-header';
import { InventoryDetailsPanel } from './inventory-details-panel';
import { InventoryDetailsTable } from './inventory-details-table';
import { INVENTORY_DETAILS_FEATURE } from './inventory-details.routes';
import { useInventoryDetails } from './use-inventory-details';

export function InventoryDetailsPage() {
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
  } = useInventoryDetails();

  return (
    <section
      className="feature-page"
      data-testid={INVENTORY_DETAILS_FEATURE.testId}
    >
      <InventoryDetailsHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <InventoryDetailsFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <InventoryDetailsTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <InventoryDetailsPanel
            selected={selected}
            onClear={() => select(null)}
          />
          <ReviewsHistorySummary compact />
        </div>
      </div>
    </section>
  );
}

export default InventoryDetailsPage;
