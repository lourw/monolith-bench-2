import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { CompareDetailsFilters } from './compare-details-filters';
import { CompareDetailsHeader } from './compare-details-header';
import { CompareDetailsPanel } from './compare-details-panel';
import { CompareDetailsTable } from './compare-details-table';
import { COMPARE_DETAILS_FEATURE } from './compare-details.routes';
import { useCompareDetails } from './use-compare-details';

export function CompareDetailsPage() {
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
  } = useCompareDetails();

  return (
    <section
      className="feature-page"
      data-testid={COMPARE_DETAILS_FEATURE.testId}
    >
      <CompareDetailsHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <CompareDetailsFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <CompareDetailsTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <CompareDetailsPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default CompareDetailsPage;
