import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { ProfileDashboardFilters } from './profile-dashboard-filters';
import { ProfileDashboardHeader } from './profile-dashboard-header';
import { ProfileDashboardPanel } from './profile-dashboard-panel';
import { ProfileDashboardTable } from './profile-dashboard-table';
import { PROFILE_DASHBOARD_FEATURE } from './profile-dashboard.routes';
import { useProfileDashboard } from './use-profile-dashboard';

export function ProfileDashboardPage() {
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
  } = useProfileDashboard();

  return (
    <section
      className="feature-page"
      data-testid={PROFILE_DASHBOARD_FEATURE.testId}
    >
      <ProfileDashboardHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <ProfileDashboardFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <ProfileDashboardTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <ProfileDashboardPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default ProfileDashboardPage;
