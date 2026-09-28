import { CoreStat } from '../../../components/core/stat/core-stat';
import { SUBSCRIPTIONS_OVERVIEW_FEATURE } from './subscriptions-overview.routes';

export interface SubscriptionsOverviewHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function SubscriptionsOverviewHeader({
  count,
  total,
  loading,
  onRefresh,
}: SubscriptionsOverviewHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${SUBSCRIPTIONS_OVERVIEW_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">
          {SUBSCRIPTIONS_OVERVIEW_FEATURE.title}
        </h1>
        <p className="feature-subtitle">
          {SUBSCRIPTIONS_OVERVIEW_FEATURE.domain} ·{' '}
          {SUBSCRIPTIONS_OVERVIEW_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <CoreStat label="Items" value={count} tone="info" />
        <CoreStat label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${SUBSCRIPTIONS_OVERVIEW_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
