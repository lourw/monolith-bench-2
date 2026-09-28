import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { SupportDetailsFilters } from './support-details-filters';
import { SupportDetailsHeader } from './support-details-header';
import { SupportDetailsPanel } from './support-details-panel';
import { SupportDetailsTable } from './support-details-table';
import { SUPPORT_DETAILS_FEATURE } from './support-details.routes';
import { useSupportDetails } from './use-support-details';

export function SupportDetailsPage() {
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
  } = useSupportDetails();

  return (
    <section
      className="feature-page"
      data-testid={SUPPORT_DETAILS_FEATURE.testId}
    >
      <SupportDetailsHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <SupportDetailsFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <SupportDetailsTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <SupportDetailsPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default SupportDetailsPage;
