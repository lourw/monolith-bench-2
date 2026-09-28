import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { SizingWizardFilters } from './sizing-wizard-filters';
import { SizingWizardHeader } from './sizing-wizard-header';
import { SizingWizardPanel } from './sizing-wizard-panel';
import { SizingWizardTable } from './sizing-wizard-table';
import { SIZING_WIZARD_FEATURE } from './sizing-wizard.routes';
import { useSizingWizard } from './use-sizing-wizard';

export function SizingWizardPage() {
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
  } = useSizingWizard();

  return (
    <section
      className="feature-page"
      data-testid={SIZING_WIZARD_FEATURE.testId}
    >
      <SizingWizardHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <SizingWizardFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <SizingWizardTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <SizingWizardPanel selected={selected} onClear={() => select(null)} />
        </div>
      </div>
    </section>
  );
}

export default SizingWizardPage;
