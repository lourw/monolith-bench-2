import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { AddressesWizardSummary } from '../../addresses/wizard/addresses-wizard-summary';
import { BundlesListFilters } from './bundles-list-filters';
import { BundlesListHeader } from './bundles-list-header';
import { BundlesListPanel } from './bundles-list-panel';
import { BundlesListTable } from './bundles-list-table';
import { BUNDLES_LIST_FEATURE } from './bundles-list.routes';
import { useBundlesList } from './use-bundles-list';

export function BundlesListPage() {
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
  } = useBundlesList();

  return (
    <section className="feature-page" data-testid={BUNDLES_LIST_FEATURE.testId}>
      <BundlesListHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <BundlesListFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <BundlesListTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <BundlesListPanel selected={selected} onClear={() => select(null)} />
          <AddressesWizardSummary compact />
        </div>
      </div>
    </section>
  );
}

export default BundlesListPage;
