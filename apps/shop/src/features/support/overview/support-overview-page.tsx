import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { SupportOverviewFilters } from './support-overview-filters';
import { SupportOverviewHeader } from './support-overview-header';
import { SupportOverviewPanel } from './support-overview-panel';
import { SupportOverviewTable } from './support-overview-table';
import { SUPPORT_OVERVIEW_FEATURE } from './support-overview.routes';
import { useSupportOverview } from './use-support-overview';

export function SupportOverviewPage() {
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
  } = useSupportOverview();

  return (
    <section
      className="feature-page"
      data-testid={SUPPORT_OVERVIEW_FEATURE.testId}
    >
      <SupportOverviewHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <SupportOverviewFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <SupportOverviewTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <SupportOverviewPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default SupportOverviewPage;
