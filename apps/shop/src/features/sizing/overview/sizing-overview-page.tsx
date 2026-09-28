import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { WishlistDetailsSummary } from '../../wishlist/details/wishlist-details-summary';
import { SizingOverviewFilters } from './sizing-overview-filters';
import { SizingOverviewHeader } from './sizing-overview-header';
import { SizingOverviewPanel } from './sizing-overview-panel';
import { SizingOverviewTable } from './sizing-overview-table';
import { SIZING_OVERVIEW_FEATURE } from './sizing-overview.routes';
import { useSizingOverview } from './use-sizing-overview';

export function SizingOverviewPage() {
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
  } = useSizingOverview();

  return (
    <section
      className="feature-page"
      data-testid={SIZING_OVERVIEW_FEATURE.testId}
    >
      <SizingOverviewHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <SizingOverviewFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <SizingOverviewTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <SizingOverviewPanel
            selected={selected}
            onClear={() => select(null)}
          />
          <WishlistDetailsSummary compact />
        </div>
      </div>
    </section>
  );
}

export default SizingOverviewPage;
