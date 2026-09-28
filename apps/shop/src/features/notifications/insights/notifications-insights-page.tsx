import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { PaymentsEditorSummary } from '../../payments/editor/payments-editor-summary';
import { NotificationsInsightsFilters } from './notifications-insights-filters';
import { NotificationsInsightsHeader } from './notifications-insights-header';
import { NotificationsInsightsPanel } from './notifications-insights-panel';
import { NotificationsInsightsTable } from './notifications-insights-table';
import { NOTIFICATIONS_INSIGHTS_FEATURE } from './notifications-insights.routes';
import { useNotificationsInsights } from './use-notifications-insights';

export function NotificationsInsightsPage() {
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
  } = useNotificationsInsights();

  return (
    <section
      className="feature-page"
      data-testid={NOTIFICATIONS_INSIGHTS_FEATURE.testId}
    >
      <NotificationsInsightsHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <NotificationsInsightsFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <NotificationsInsightsTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <NotificationsInsightsPanel
            selected={selected}
            onClear={() => select(null)}
          />
          <PaymentsEditorSummary compact />
        </div>
      </div>
    </section>
  );
}

export default NotificationsInsightsPage;
