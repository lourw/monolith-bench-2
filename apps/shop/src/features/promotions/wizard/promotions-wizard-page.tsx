import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { ReturnsHistorySummary } from '../../returns/history/returns-history-summary';
import { PromotionsWizardFilters } from './promotions-wizard-filters';
import { PromotionsWizardHeader } from './promotions-wizard-header';
import { PromotionsWizardPanel } from './promotions-wizard-panel';
import { PromotionsWizardTable } from './promotions-wizard-table';
import { PROMOTIONS_WIZARD_FEATURE } from './promotions-wizard.routes';
import { usePromotionsWizard } from './use-promotions-wizard';

export function PromotionsWizardPage() {
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
  } = usePromotionsWizard();

  return (
    <section
      className="feature-page"
      data-testid={PROMOTIONS_WIZARD_FEATURE.testId}
    >
      <PromotionsWizardHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <PromotionsWizardFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <PromotionsWizardTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <PromotionsWizardPanel
            selected={selected}
            onClear={() => select(null)}
          />
          <ReturnsHistorySummary compact />
        </div>
      </div>
    </section>
  );
}

export default PromotionsWizardPage;
