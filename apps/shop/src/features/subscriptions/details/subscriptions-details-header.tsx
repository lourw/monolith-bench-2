import { MediaChip } from '../../../components/media/chip/media-chip';
import { SUBSCRIPTIONS_DETAILS_FEATURE } from './subscriptions-details.routes';

export interface SubscriptionsDetailsHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function SubscriptionsDetailsHeader({
  count,
  total,
  loading,
  onRefresh,
}: SubscriptionsDetailsHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${SUBSCRIPTIONS_DETAILS_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{SUBSCRIPTIONS_DETAILS_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {SUBSCRIPTIONS_DETAILS_FEATURE.domain} ·{' '}
          {SUBSCRIPTIONS_DETAILS_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <MediaChip label="Items" value={count} tone="info" />
        <MediaChip label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${SUBSCRIPTIONS_DETAILS_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
