import { DataStat } from '../../../components/data/stat/data-stat';
import { SUBSCRIPTIONS_DASHBOARD_FEATURE } from './subscriptions-dashboard.routes';

export interface SubscriptionsDashboardHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function SubscriptionsDashboardHeader({
  count,
  total,
  loading,
  onRefresh,
}: SubscriptionsDashboardHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${SUBSCRIPTIONS_DASHBOARD_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">
          {SUBSCRIPTIONS_DASHBOARD_FEATURE.title}
        </h1>
        <p className="feature-subtitle">
          {SUBSCRIPTIONS_DASHBOARD_FEATURE.domain} ·{' '}
          {SUBSCRIPTIONS_DASHBOARD_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <DataStat label="Items" value={count} tone="info" />
        <DataStat label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${SUBSCRIPTIONS_DASHBOARD_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
