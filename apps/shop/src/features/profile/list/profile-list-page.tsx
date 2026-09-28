import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { ProfileListFilters } from './profile-list-filters';
import { ProfileListHeader } from './profile-list-header';
import { ProfileListPanel } from './profile-list-panel';
import { ProfileListTable } from './profile-list-table';
import { PROFILE_LIST_FEATURE } from './profile-list.routes';
import { useProfileList } from './use-profile-list';

export function ProfileListPage() {
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
  } = useProfileList();

  return (
    <section className="feature-page" data-testid={PROFILE_LIST_FEATURE.testId}>
      <ProfileListHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <ProfileListFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <ProfileListTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <ProfileListPanel selected={selected} onClear={() => select(null)} />
        </div>
      </div>
    </section>
  );
}

export default ProfileListPage;
