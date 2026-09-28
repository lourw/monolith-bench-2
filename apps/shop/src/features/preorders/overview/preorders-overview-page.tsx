import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { ReturnsListSummary } from '../../returns/list/returns-list-summary';
import { PreordersOverviewFilters } from './preorders-overview-filters';
import { PreordersOverviewHeader } from './preorders-overview-header';
import { PreordersOverviewPanel } from './preorders-overview-panel';
import { PreordersOverviewTable } from './preorders-overview-table';
import { PREORDERS_OVERVIEW_FEATURE } from './preorders-overview.routes';
import { usePreordersOverview } from './use-preorders-overview';

export function PreordersOverviewPage() {
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
  } = usePreordersOverview();

  return (
    <section
      className="feature-page"
      data-testid={PREORDERS_OVERVIEW_FEATURE.testId}
    >
      <PreordersOverviewHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <PreordersOverviewFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <PreordersOverviewTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <PreordersOverviewPanel
            selected={selected}
            onClear={() => select(null)}
          />
          <ReturnsListSummary compact />
        </div>
      </div>
    </section>
  );
}

export default PreordersOverviewPage;
