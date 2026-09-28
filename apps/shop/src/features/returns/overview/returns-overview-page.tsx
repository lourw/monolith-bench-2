import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { SearchDetailsSummary } from '../../search/details/search-details-summary';
import { ReturnsOverviewFilters } from './returns-overview-filters';
import { ReturnsOverviewHeader } from './returns-overview-header';
import { ReturnsOverviewPanel } from './returns-overview-panel';
import { ReturnsOverviewTable } from './returns-overview-table';
import { RETURNS_OVERVIEW_FEATURE } from './returns-overview.routes';
import { useReturnsOverview } from './use-returns-overview';

export function ReturnsOverviewPage() {
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
  } = useReturnsOverview();

  return (
    <section
      className="feature-page"
      data-testid={RETURNS_OVERVIEW_FEATURE.testId}
    >
      <ReturnsOverviewHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <ReturnsOverviewFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <ReturnsOverviewTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <ReturnsOverviewPanel
            selected={selected}
            onClear={() => select(null)}
          />
          <SearchDetailsSummary compact />
        </div>
      </div>
    </section>
  );
}

export default ReturnsOverviewPage;
