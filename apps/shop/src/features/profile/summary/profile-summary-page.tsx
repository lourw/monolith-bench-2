import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { ProfileSummaryFilters } from './profile-summary-filters';
import { ProfileSummaryHeader } from './profile-summary-header';
import { ProfileSummaryPanel } from './profile-summary-panel';
import { ProfileSummaryTable } from './profile-summary-table';
import { PROFILE_SUMMARY_FEATURE } from './profile-summary.routes';
import { useProfileSummary } from './use-profile-summary';

export function ProfileSummaryPage() {
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
  } = useProfileSummary();

  return (
    <section
      className="feature-page"
      data-testid={PROFILE_SUMMARY_FEATURE.testId}
    >
      <ProfileSummaryHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <ProfileSummaryFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <ProfileSummaryTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <ProfileSummaryPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default ProfileSummaryPage;
