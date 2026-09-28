import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { AccountListSummary } from '../../account/list/account-list-summary';
import { LoyaltyWizardFilters } from './loyalty-wizard-filters';
import { LoyaltyWizardHeader } from './loyalty-wizard-header';
import { LoyaltyWizardPanel } from './loyalty-wizard-panel';
import { LoyaltyWizardTable } from './loyalty-wizard-table';
import { LOYALTY_WIZARD_FEATURE } from './loyalty-wizard.routes';
import { useLoyaltyWizard } from './use-loyalty-wizard';

export function LoyaltyWizardPage() {
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
  } = useLoyaltyWizard();

  return (
    <section
      className="feature-page"
      data-testid={LOYALTY_WIZARD_FEATURE.testId}
    >
      <LoyaltyWizardHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <LoyaltyWizardFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <LoyaltyWizardTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <LoyaltyWizardPanel
            selected={selected}
            onClear={() => select(null)}
          />
          <AccountListSummary compact />
        </div>
      </div>
    </section>
  );
}

export default LoyaltyWizardPage;
