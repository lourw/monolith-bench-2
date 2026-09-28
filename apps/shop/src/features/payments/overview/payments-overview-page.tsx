import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { ReviewsSettingsSummary } from '../../reviews/settings/reviews-settings-summary';
import { PaymentsOverviewFilters } from './payments-overview-filters';
import { PaymentsOverviewHeader } from './payments-overview-header';
import { PaymentsOverviewPanel } from './payments-overview-panel';
import { PaymentsOverviewTable } from './payments-overview-table';
import { PAYMENTS_OVERVIEW_FEATURE } from './payments-overview.routes';
import { usePaymentsOverview } from './use-payments-overview';

export function PaymentsOverviewPage() {
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
  } = usePaymentsOverview();

  return (
    <section
      className="feature-page"
      data-testid={PAYMENTS_OVERVIEW_FEATURE.testId}
    >
      <PaymentsOverviewHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <PaymentsOverviewFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <PaymentsOverviewTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <PaymentsOverviewPanel
            selected={selected}
            onClear={() => select(null)}
          />
          <ReviewsSettingsSummary compact />
        </div>
      </div>
    </section>
  );
}

export default PaymentsOverviewPage;
