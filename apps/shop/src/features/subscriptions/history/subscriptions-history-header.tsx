import { DataBadge } from '../../../components/data/badge/data-badge';
import { SUBSCRIPTIONS_HISTORY_FEATURE } from './subscriptions-history.routes';

export interface SubscriptionsHistoryHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function SubscriptionsHistoryHeader({
  count,
  total,
  loading,
  onRefresh,
}: SubscriptionsHistoryHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${SUBSCRIPTIONS_HISTORY_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{SUBSCRIPTIONS_HISTORY_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {SUBSCRIPTIONS_HISTORY_FEATURE.domain} ·{' '}
          {SUBSCRIPTIONS_HISTORY_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <DataBadge label="Items" value={count} tone="info" />
        <DataBadge label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${SUBSCRIPTIONS_HISTORY_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
