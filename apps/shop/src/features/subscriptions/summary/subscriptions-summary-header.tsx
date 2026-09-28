import { OverlayStat } from '../../../components/overlay/stat/overlay-stat';
import { SUBSCRIPTIONS_SUMMARY_FEATURE } from './subscriptions-summary.routes';

export interface SubscriptionsSummaryHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function SubscriptionsSummaryHeader({
  count,
  total,
  loading,
  onRefresh,
}: SubscriptionsSummaryHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${SUBSCRIPTIONS_SUMMARY_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{SUBSCRIPTIONS_SUMMARY_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {SUBSCRIPTIONS_SUMMARY_FEATURE.domain} ·{' '}
          {SUBSCRIPTIONS_SUMMARY_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <OverlayStat label="Items" value={count} tone="info" />
        <OverlayStat label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${SUBSCRIPTIONS_SUMMARY_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
