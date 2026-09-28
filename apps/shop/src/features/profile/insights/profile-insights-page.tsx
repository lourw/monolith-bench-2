import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { ProfileInsightsFilters } from './profile-insights-filters';
import { ProfileInsightsHeader } from './profile-insights-header';
import { ProfileInsightsPanel } from './profile-insights-panel';
import { ProfileInsightsTable } from './profile-insights-table';
import { PROFILE_INSIGHTS_FEATURE } from './profile-insights.routes';
import { useProfileInsights } from './use-profile-insights';

export function ProfileInsightsPage() {
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
  } = useProfileInsights();

  return (
    <section
      className="feature-page"
      data-testid={PROFILE_INSIGHTS_FEATURE.testId}
    >
      <ProfileInsightsHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <ProfileInsightsFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <ProfileInsightsTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <ProfileInsightsPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default ProfileInsightsPage;
