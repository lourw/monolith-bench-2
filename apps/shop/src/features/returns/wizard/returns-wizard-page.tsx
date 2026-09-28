import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { ReturnsWizardFilters } from './returns-wizard-filters';
import { ReturnsWizardHeader } from './returns-wizard-header';
import { ReturnsWizardPanel } from './returns-wizard-panel';
import { ReturnsWizardTable } from './returns-wizard-table';
import { RETURNS_WIZARD_FEATURE } from './returns-wizard.routes';
import { useReturnsWizard } from './use-returns-wizard';

export function ReturnsWizardPage() {
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
  } = useReturnsWizard();

  return (
    <section
      className="feature-page"
      data-testid={RETURNS_WIZARD_FEATURE.testId}
    >
      <ReturnsWizardHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <ReturnsWizardFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <ReturnsWizardTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <ReturnsWizardPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default ReturnsWizardPage;
