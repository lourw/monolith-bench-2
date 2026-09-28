import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { SupportSummaryFilters } from './support-summary-filters';
import { SupportSummaryHeader } from './support-summary-header';
import { SupportSummaryPanel } from './support-summary-panel';
import { SupportSummaryTable } from './support-summary-table';
import { SUPPORT_SUMMARY_FEATURE } from './support-summary.routes';
import { useSupportSummary } from './use-support-summary';

export function SupportSummaryPage() {
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
  } = useSupportSummary();

  return (
    <section
      className="feature-page"
      data-testid={SUPPORT_SUMMARY_FEATURE.testId}
    >
      <SupportSummaryHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <SupportSummaryFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <SupportSummaryTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <SupportSummaryPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default SupportSummaryPage;
