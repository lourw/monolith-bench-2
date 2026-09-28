import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { ProfileHistoryFilters } from './profile-history-filters';
import { ProfileHistoryHeader } from './profile-history-header';
import { ProfileHistoryPanel } from './profile-history-panel';
import { ProfileHistoryTable } from './profile-history-table';
import { PROFILE_HISTORY_FEATURE } from './profile-history.routes';
import { useProfileHistory } from './use-profile-history';

export function ProfileHistoryPage() {
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
  } = useProfileHistory();

  return (
    <section
      className="feature-page"
      data-testid={PROFILE_HISTORY_FEATURE.testId}
    >
      <ProfileHistoryHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <ProfileHistoryFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <ProfileHistoryTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <ProfileHistoryPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default ProfileHistoryPage;
