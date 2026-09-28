import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { AuthWizardFilters } from './auth-wizard-filters';
import { AuthWizardHeader } from './auth-wizard-header';
import { AuthWizardPanel } from './auth-wizard-panel';
import { AuthWizardTable } from './auth-wizard-table';
import { AUTH_WIZARD_FEATURE } from './auth-wizard.routes';
import { useAuthWizard } from './use-auth-wizard';

export function AuthWizardPage() {
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
  } = useAuthWizard();

  return (
    <section className="feature-page" data-testid={AUTH_WIZARD_FEATURE.testId}>
      <AuthWizardHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <AuthWizardFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <AuthWizardTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <AuthWizardPanel selected={selected} onClear={() => select(null)} />
        </div>
      </div>
    </section>
  );
}

export default AuthWizardPage;
