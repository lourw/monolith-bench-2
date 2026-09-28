import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { SubscriptionsWizardFilters } from './subscriptions-wizard-filters';
import { SubscriptionsWizardHeader } from './subscriptions-wizard-header';
import { SubscriptionsWizardPanel } from './subscriptions-wizard-panel';
import { SubscriptionsWizardTable } from './subscriptions-wizard-table';
import { SUBSCRIPTIONS_WIZARD_FEATURE } from './subscriptions-wizard.routes';
import { useSubscriptionsWizard } from './use-subscriptions-wizard';

export function SubscriptionsWizardPage() {
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
  } = useSubscriptionsWizard();

  return (
    <section
      className="feature-page"
      data-testid={SUBSCRIPTIONS_WIZARD_FEATURE.testId}
    >
      <SubscriptionsWizardHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <SubscriptionsWizardFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <SubscriptionsWizardTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <SubscriptionsWizardPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default SubscriptionsWizardPage;
