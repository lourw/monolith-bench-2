import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { CompareWizardFilters } from './compare-wizard-filters';
import { CompareWizardHeader } from './compare-wizard-header';
import { CompareWizardPanel } from './compare-wizard-panel';
import { CompareWizardTable } from './compare-wizard-table';
import { COMPARE_WIZARD_FEATURE } from './compare-wizard.routes';
import { useCompareWizard } from './use-compare-wizard';

export function CompareWizardPage() {
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
  } = useCompareWizard();

  return (
    <section
      className="feature-page"
      data-testid={COMPARE_WIZARD_FEATURE.testId}
    >
      <CompareWizardHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <CompareWizardFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <CompareWizardTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <CompareWizardPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default CompareWizardPage;
