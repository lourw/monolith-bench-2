import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { SupportWizardFilters } from './support-wizard-filters';
import { SupportWizardHeader } from './support-wizard-header';
import { SupportWizardPanel } from './support-wizard-panel';
import { SupportWizardTable } from './support-wizard-table';
import { SUPPORT_WIZARD_FEATURE } from './support-wizard.routes';
import { useSupportWizard } from './use-support-wizard';

export function SupportWizardPage() {
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
  } = useSupportWizard();

  return (
    <section
      className="feature-page"
      data-testid={SUPPORT_WIZARD_FEATURE.testId}
    >
      <SupportWizardHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <SupportWizardFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <SupportWizardTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <SupportWizardPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default SupportWizardPage;
