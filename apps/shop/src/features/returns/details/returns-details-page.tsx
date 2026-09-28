import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { ReturnsDetailsFilters } from './returns-details-filters';
import { ReturnsDetailsHeader } from './returns-details-header';
import { ReturnsDetailsPanel } from './returns-details-panel';
import { ReturnsDetailsTable } from './returns-details-table';
import { RETURNS_DETAILS_FEATURE } from './returns-details.routes';
import { useReturnsDetails } from './use-returns-details';

export function ReturnsDetailsPage() {
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
  } = useReturnsDetails();

  return (
    <section
      className="feature-page"
      data-testid={RETURNS_DETAILS_FEATURE.testId}
    >
      <ReturnsDetailsHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <ReturnsDetailsFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <ReturnsDetailsTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <ReturnsDetailsPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default ReturnsDetailsPage;
