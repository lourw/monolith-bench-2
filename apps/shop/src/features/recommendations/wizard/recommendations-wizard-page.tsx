import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { RecommendationsWizardFilters } from './recommendations-wizard-filters';
import { RecommendationsWizardHeader } from './recommendations-wizard-header';
import { RecommendationsWizardPanel } from './recommendations-wizard-panel';
import { RecommendationsWizardTable } from './recommendations-wizard-table';
import { RECOMMENDATIONS_WIZARD_FEATURE } from './recommendations-wizard.routes';
import { useRecommendationsWizard } from './use-recommendations-wizard';

export function RecommendationsWizardPage() {
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
  } = useRecommendationsWizard();

  return (
    <section
      className="feature-page"
      data-testid={RECOMMENDATIONS_WIZARD_FEATURE.testId}
    >
      <RecommendationsWizardHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <RecommendationsWizardFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <RecommendationsWizardTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <RecommendationsWizardPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default RecommendationsWizardPage;
