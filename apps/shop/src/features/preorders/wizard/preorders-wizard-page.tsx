import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { PreordersWizardFilters } from './preorders-wizard-filters';
import { PreordersWizardHeader } from './preorders-wizard-header';
import { PreordersWizardPanel } from './preorders-wizard-panel';
import { PreordersWizardTable } from './preorders-wizard-table';
import { PREORDERS_WIZARD_FEATURE } from './preorders-wizard.routes';
import { usePreordersWizard } from './use-preorders-wizard';

export function PreordersWizardPage() {
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
  } = usePreordersWizard();

  return (
    <section
      className="feature-page"
      data-testid={PREORDERS_WIZARD_FEATURE.testId}
    >
      <PreordersWizardHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <PreordersWizardFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <PreordersWizardTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <PreordersWizardPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default PreordersWizardPage;
