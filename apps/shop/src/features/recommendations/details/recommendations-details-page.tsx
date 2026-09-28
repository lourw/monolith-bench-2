import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { RecommendationsDetailsFilters } from './recommendations-details-filters';
import { RecommendationsDetailsHeader } from './recommendations-details-header';
import { RecommendationsDetailsPanel } from './recommendations-details-panel';
import { RecommendationsDetailsTable } from './recommendations-details-table';
import { RECOMMENDATIONS_DETAILS_FEATURE } from './recommendations-details.routes';
import { useRecommendationsDetails } from './use-recommendations-details';

export function RecommendationsDetailsPage() {
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
  } = useRecommendationsDetails();

  return (
    <section
      className="feature-page"
      data-testid={RECOMMENDATIONS_DETAILS_FEATURE.testId}
    >
      <RecommendationsDetailsHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <RecommendationsDetailsFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <RecommendationsDetailsTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <RecommendationsDetailsPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default RecommendationsDetailsPage;
