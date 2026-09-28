import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { AnalyticsWizardFilters } from './analytics-wizard-filters';
import { AnalyticsWizardHeader } from './analytics-wizard-header';
import { AnalyticsWizardPanel } from './analytics-wizard-panel';
import { AnalyticsWizardTable } from './analytics-wizard-table';
import { ANALYTICS_WIZARD_FEATURE } from './analytics-wizard.routes';
import { useAnalyticsWizard } from './use-analytics-wizard';

export function AnalyticsWizardPage() {
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
  } = useAnalyticsWizard();

  return (
    <section
      className="feature-page"
      data-testid={ANALYTICS_WIZARD_FEATURE.testId}
    >
      <AnalyticsWizardHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <AnalyticsWizardFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <AnalyticsWizardTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <AnalyticsWizardPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default AnalyticsWizardPage;
