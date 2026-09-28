import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { ProfileDetailsFilters } from './profile-details-filters';
import { ProfileDetailsHeader } from './profile-details-header';
import { ProfileDetailsPanel } from './profile-details-panel';
import { ProfileDetailsTable } from './profile-details-table';
import { PROFILE_DETAILS_FEATURE } from './profile-details.routes';
import { useProfileDetails } from './use-profile-details';

export function ProfileDetailsPage() {
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
  } = useProfileDetails();

  return (
    <section
      className="feature-page"
      data-testid={PROFILE_DETAILS_FEATURE.testId}
    >
      <ProfileDetailsHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <ProfileDetailsFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <ProfileDetailsTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <ProfileDetailsPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default ProfileDetailsPage;
