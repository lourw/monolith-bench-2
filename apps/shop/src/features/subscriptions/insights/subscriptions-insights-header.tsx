import { MediaList } from '../../../components/media/list/media-list';
import { SUBSCRIPTIONS_INSIGHTS_FEATURE } from './subscriptions-insights.routes';

export interface SubscriptionsInsightsHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function SubscriptionsInsightsHeader({
  count,
  total,
  loading,
  onRefresh,
}: SubscriptionsInsightsHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${SUBSCRIPTIONS_INSIGHTS_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">
          {SUBSCRIPTIONS_INSIGHTS_FEATURE.title}
        </h1>
        <p className="feature-subtitle">
          {SUBSCRIPTIONS_INSIGHTS_FEATURE.domain} ·{' '}
          {SUBSCRIPTIONS_INSIGHTS_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <MediaList label="Items" value={count} tone="info" />
        <MediaList label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${SUBSCRIPTIONS_INSIGHTS_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
