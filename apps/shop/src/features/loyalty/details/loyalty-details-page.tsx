import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { LoyaltyDetailsFilters } from './loyalty-details-filters';
import { LoyaltyDetailsHeader } from './loyalty-details-header';
import { LoyaltyDetailsPanel } from './loyalty-details-panel';
import { LoyaltyDetailsTable } from './loyalty-details-table';
import { LOYALTY_DETAILS_FEATURE } from './loyalty-details.routes';
import { useLoyaltyDetails } from './use-loyalty-details';

export function LoyaltyDetailsPage() {
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
  } = useLoyaltyDetails();

  return (
    <section
      className="feature-page"
      data-testid={LOYALTY_DETAILS_FEATURE.testId}
    >
      <LoyaltyDetailsHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <LoyaltyDetailsFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <LoyaltyDetailsTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <LoyaltyDetailsPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default LoyaltyDetailsPage;
