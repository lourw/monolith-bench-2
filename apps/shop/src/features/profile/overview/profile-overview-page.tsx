import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { WishlistListSummary } from '../../wishlist/list/wishlist-list-summary';
import { ProfileOverviewFilters } from './profile-overview-filters';
import { ProfileOverviewHeader } from './profile-overview-header';
import { ProfileOverviewPanel } from './profile-overview-panel';
import { ProfileOverviewTable } from './profile-overview-table';
import { PROFILE_OVERVIEW_FEATURE } from './profile-overview.routes';
import { useProfileOverview } from './use-profile-overview';

export function ProfileOverviewPage() {
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
  } = useProfileOverview();

  return (
    <section
      className="feature-page"
      data-testid={PROFILE_OVERVIEW_FEATURE.testId}
    >
      <ProfileOverviewHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <ProfileOverviewFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <ProfileOverviewTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <ProfileOverviewPanel
            selected={selected}
            onClear={() => select(null)}
          />
          <WishlistListSummary compact />
        </div>
      </div>
    </section>
  );
}

export default ProfileOverviewPage;
