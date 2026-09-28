import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { FeedbackWizardFilters } from './feedback-wizard-filters';
import { FeedbackWizardHeader } from './feedback-wizard-header';
import { FeedbackWizardPanel } from './feedback-wizard-panel';
import { FeedbackWizardTable } from './feedback-wizard-table';
import { FEEDBACK_WIZARD_FEATURE } from './feedback-wizard.routes';
import { useFeedbackWizard } from './use-feedback-wizard';

export function FeedbackWizardPage() {
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
  } = useFeedbackWizard();

  return (
    <section
      className="feature-page"
      data-testid={FEEDBACK_WIZARD_FEATURE.testId}
    >
      <FeedbackWizardHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <FeedbackWizardFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <FeedbackWizardTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <FeedbackWizardPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default FeedbackWizardPage;
