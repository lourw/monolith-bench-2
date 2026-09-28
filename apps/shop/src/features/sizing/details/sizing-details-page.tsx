import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { SizingDetailsFilters } from './sizing-details-filters';
import { SizingDetailsHeader } from './sizing-details-header';
import { SizingDetailsPanel } from './sizing-details-panel';
import { SizingDetailsTable } from './sizing-details-table';
import { SIZING_DETAILS_FEATURE } from './sizing-details.routes';
import { useSizingDetails } from './use-sizing-details';

export function SizingDetailsPage() {
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
  } = useSizingDetails();

  return (
    <section
      className="feature-page"
      data-testid={SIZING_DETAILS_FEATURE.testId}
    >
      <SizingDetailsHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <SizingDetailsFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <SizingDetailsTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <SizingDetailsPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default SizingDetailsPage;
