import { FeedbackChip } from '../../../components/feedback/chip/feedback-chip';
import { SUBSCRIPTIONS_LIST_FEATURE } from './subscriptions-list.routes';

export interface SubscriptionsListHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function SubscriptionsListHeader({
  count,
  total,
  loading,
  onRefresh,
}: SubscriptionsListHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${SUBSCRIPTIONS_LIST_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{SUBSCRIPTIONS_LIST_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {SUBSCRIPTIONS_LIST_FEATURE.domain} ·{' '}
          {SUBSCRIPTIONS_LIST_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <FeedbackChip label="Items" value={count} tone="info" />
        <FeedbackChip label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${SUBSCRIPTIONS_LIST_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
