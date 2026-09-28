import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { FeedbackDashboardFilters } from './feedback-dashboard-filters';
import { FeedbackDashboardHeader } from './feedback-dashboard-header';
import { FeedbackDashboardPanel } from './feedback-dashboard-panel';
import { FeedbackDashboardTable } from './feedback-dashboard-table';
import { FEEDBACK_DASHBOARD_FEATURE } from './feedback-dashboard.routes';
import { useFeedbackDashboard } from './use-feedback-dashboard';

export function FeedbackDashboardPage() {
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
  } = useFeedbackDashboard();

  return (
    <section
      className="feature-page"
      data-testid={FEEDBACK_DASHBOARD_FEATURE.testId}
    >
      <FeedbackDashboardHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <FeedbackDashboardFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <FeedbackDashboardTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <FeedbackDashboardPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default FeedbackDashboardPage;
