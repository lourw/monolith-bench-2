import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { ProfileWizardFilters } from './profile-wizard-filters';
import { ProfileWizardHeader } from './profile-wizard-header';
import { ProfileWizardPanel } from './profile-wizard-panel';
import { ProfileWizardTable } from './profile-wizard-table';
import { PROFILE_WIZARD_FEATURE } from './profile-wizard.routes';
import { useProfileWizard } from './use-profile-wizard';

export function ProfileWizardPage() {
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
  } = useProfileWizard();

  return (
    <section
      className="feature-page"
      data-testid={PROFILE_WIZARD_FEATURE.testId}
    >
      <ProfileWizardHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <ProfileWizardFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <ProfileWizardTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <ProfileWizardPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default ProfileWizardPage;
