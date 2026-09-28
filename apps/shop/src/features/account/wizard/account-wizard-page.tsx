import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { AccountWizardFilters } from './account-wizard-filters';
import { AccountWizardHeader } from './account-wizard-header';
import { AccountWizardPanel } from './account-wizard-panel';
import { AccountWizardTable } from './account-wizard-table';
import { ACCOUNT_WIZARD_FEATURE } from './account-wizard.routes';
import { useAccountWizard } from './use-account-wizard';

export function AccountWizardPage() {
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
  } = useAccountWizard();

  return (
    <section
      className="feature-page"
      data-testid={ACCOUNT_WIZARD_FEATURE.testId}
    >
      <AccountWizardHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <AccountWizardFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <AccountWizardTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <AccountWizardPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default AccountWizardPage;
