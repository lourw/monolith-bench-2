import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { TrackingWizardFilters } from './tracking-wizard-filters';
import { TrackingWizardHeader } from './tracking-wizard-header';
import { TrackingWizardPanel } from './tracking-wizard-panel';
import { TrackingWizardTable } from './tracking-wizard-table';
import { TRACKING_WIZARD_FEATURE } from './tracking-wizard.routes';
import { useTrackingWizard } from './use-tracking-wizard';

export function TrackingWizardPage() {
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
  } = useTrackingWizard();

  return (
    <section
      className="feature-page"
      data-testid={TRACKING_WIZARD_FEATURE.testId}
    >
      <TrackingWizardHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <TrackingWizardFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <TrackingWizardTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <TrackingWizardPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default TrackingWizardPage;
