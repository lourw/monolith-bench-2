import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { ReviewsHistorySummary } from '../../reviews/history/reviews-history-summary';
import { AddressesWizardFilters } from './addresses-wizard-filters';
import { AddressesWizardHeader } from './addresses-wizard-header';
import { AddressesWizardPanel } from './addresses-wizard-panel';
import { AddressesWizardTable } from './addresses-wizard-table';
import { ADDRESSES_WIZARD_FEATURE } from './addresses-wizard.routes';
import { useAddressesWizard } from './use-addresses-wizard';

export function AddressesWizardPage() {
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
  } = useAddressesWizard();

  return (
    <section
      className="feature-page"
      data-testid={ADDRESSES_WIZARD_FEATURE.testId}
    >
      <AddressesWizardHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <AddressesWizardFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <AddressesWizardTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <AddressesWizardPanel
            selected={selected}
            onClear={() => select(null)}
          />
          <ReviewsHistorySummary compact />
        </div>
      </div>
    </section>
  );
}

export default AddressesWizardPage;
