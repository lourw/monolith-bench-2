import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { LoyaltyOverviewFilters } from './loyalty-overview-filters';
import { LoyaltyOverviewHeader } from './loyalty-overview-header';
import { LoyaltyOverviewPanel } from './loyalty-overview-panel';
import { LoyaltyOverviewTable } from './loyalty-overview-table';
import { LOYALTY_OVERVIEW_FEATURE } from './loyalty-overview.routes';
import { useLoyaltyOverview } from './use-loyalty-overview';

export function LoyaltyOverviewPage() {
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
  } = useLoyaltyOverview();

  return (
    <section
      className="feature-page"
      data-testid={LOYALTY_OVERVIEW_FEATURE.testId}
    >
      <LoyaltyOverviewHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <LoyaltyOverviewFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <LoyaltyOverviewTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <LoyaltyOverviewPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default LoyaltyOverviewPage;
