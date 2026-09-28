import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { PreordersDetailsFilters } from './preorders-details-filters';
import { PreordersDetailsHeader } from './preorders-details-header';
import { PreordersDetailsPanel } from './preorders-details-panel';
import { PreordersDetailsTable } from './preorders-details-table';
import { PREORDERS_DETAILS_FEATURE } from './preorders-details.routes';
import { usePreordersDetails } from './use-preorders-details';

export function PreordersDetailsPage() {
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
  } = usePreordersDetails();

  return (
    <section
      className="feature-page"
      data-testid={PREORDERS_DETAILS_FEATURE.testId}
    >
      <PreordersDetailsHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <PreordersDetailsFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <PreordersDetailsTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <PreordersDetailsPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default PreordersDetailsPage;
