import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { PromotionsOverviewSummary } from '../../promotions/overview/promotions-overview-summary';
import { SupportListFilters } from './support-list-filters';
import { SupportListHeader } from './support-list-header';
import { SupportListPanel } from './support-list-panel';
import { SupportListTable } from './support-list-table';
import { SUPPORT_LIST_FEATURE } from './support-list.routes';
import { useSupportList } from './use-support-list';

export function SupportListPage() {
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
  } = useSupportList();

  return (
    <section className="feature-page" data-testid={SUPPORT_LIST_FEATURE.testId}>
      <SupportListHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <SupportListFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <SupportListTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <SupportListPanel selected={selected} onClear={() => select(null)} />
          <PromotionsOverviewSummary compact />
        </div>
      </div>
    </section>
  );
}

export default SupportListPage;
